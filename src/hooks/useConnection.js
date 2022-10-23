import { useEffect, useReducer, useRef } from "react";
import Peer from "simple-peer";

import useSocket from "./useSocket";
import { audioRefsAction, peersAction } from "../reducer/actions";
import { CHANNEL } from "../config/constants";
import { audioRefsReducer, peersReducer } from "../reducer";

export default function useConnection(channelId) {
  const [audioRefs, audioRefsDispatch] = useReducer(audioRefsReducer, []);
  const [peers, peersDispatch] = useReducer(peersReducer, []);
  const socket = useSocket();
  const myAudio = useRef();

  useEffect(() => {
    const connectRTC = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      myAudio.current.srcObject = stream;

      socket.emit(CHANNEL.JOIN, channelId);

      socket.on(CHANNEL.EXISTED_CALLEES, (callees) => {
        console.log(callees, "콜러스 받음_caller");
        const newPeers = callees.map((calleeId) => {
          const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
          });

          peer.on("signal", (signal) => {
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
          socket.emit(CHANNEL.ANSWER, {
            callerId: payload.callerId,
            signal,
          });
        });

        peer.id = payload.callerId;
        peer.signal(payload.signal);

        peersDispatch({ type: peersAction.ADD, payload: peer });
      });

      socket.on(CHANNEL.RETURN_SIGNAL, (payload) => {
        peersDispatch({ type: peersAction.SIGNAL, payload });
      });

      socket.on(CHANNEL.USER_DISCONNECT, (targetId) => {
        audioRefsDispatch({ type: audioRefsAction.DELETE, payload: targetId });
        peersDispatch({ type: peersAction.DISCONNECT, payload: targetId });
      });
    };

    if (socket) {
      connectRTC();
    }
  }, [channelId, socket]);

  return {
    peers,
    myAudio,
    audioRefs,
    audioRefsDispatch,
  };
}
