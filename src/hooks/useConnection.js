import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "simple-peer";

import { audioRefsAction, peersAction } from "../reducer/actions";
import { audioRefsReducer, peersReducer } from "../reducer";
import { CHANNEL } from "../config/constants";
import useSocket from "./useSocket";

export default function useConnection(channelId) {
  const [audioRefs, audioRefsDispatch] = useReducer(audioRefsReducer, []);
  const [peers, peersDispatch] = useReducer(peersReducer, []);
  const [err, setErr] = useState(null);
  const socket = useSocket();
  const myAudio = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const connectRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        myAudio.current.srcObject = stream;

        socket.emit(CHANNEL.JOIN, channelId);

        socket.on(CHANNEL.EXISTED_CALLEES, (callees) => {
          const newPeers = callees.map((calleeId) => {
            const peer = new Peer({
              initiator: true,
              trickle: false,
              stream,
            });

            peer.on("signal", (signal) => {
              if (signal.renegotiate || signal.transceiverRequest) {
                return;
              }

              socket.emit(CHANNEL.OFFER, {
                calleeId,
                callerId: socket.id,
                signal,
              });
            });

            peer.id = calleeId;

            return peer;
          });

          peersDispatch({ type: peersAction.INIT, payload: newPeers });
        });

        socket.on(CHANNEL.USER_JOIN, (payload) => {
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
          });

          peer.on("signal", (signal) => {
            if (signal.renegotiate || signal.transceiverRequest) {
              return;
            }

            socket.emit(CHANNEL.ANSWER, {
              callerId: payload.callerId,
              signal,
            });
          });

          peer.signal(payload.signal);

          peer.id = payload.callerId;

          peersDispatch({ type: peersAction.ADD, payload: peer });
        });

        socket.on(CHANNEL.RETURN_SIGNAL, (payload) => {
          peersDispatch({ type: peersAction.SIGNAL, payload });
        });

        socket.on(CHANNEL.USER_DISCONNECT, (targetId) => {
          audioRefsDispatch({
            type: audioRefsAction.DELETE,
            payload: targetId,
          });

          peersDispatch({ type: peersAction.DISCONNECT, payload: targetId });
        });
      } catch (error) {
        setErr("미디어 장치가 없습니다");
      }
    };

    if (socket) {
      connectRTC();
    }
  }, [channelId, navigate, socket]);

  return {
    peers,
    myAudio,
    audioRefs,
    audioRefsDispatch,
    err,
  };
}
