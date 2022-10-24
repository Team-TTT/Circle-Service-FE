import { useEffect, useReducer, useRef } from "react";
import Peer from "simple-peer";

import { audioRefsAction, peersAction } from "../reducer/actions";
import { audioRefsReducer, peersReducer } from "../reducer";
import { CHANNEL } from "../config/constants";
import useSocket from "./useSocket";

export default function useConnection(channelId) {
  const [audioRefs, audioRefsDispatch] = useReducer(audioRefsReducer, []);
  const [peers, peersDispatch] = useReducer(peersReducer, []);
  const socket = useSocket();
  const myAudio = useRef();

  useEffect(() => {
    try {
      const connectRTC = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
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
            peer._debug = console.log;
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

            peer.on("close", () => peer.destroy());
            peer.on("error", (error) => {
              /* eslint-disable-next-line no-console */
              console.error(error);
              console.log("🔥", error);
            });

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

          peer.on("close", () => peer.destroy());
          peer.on("error", (error) => {
            /* eslint-disable-next-line no-console */
            console.error(error);
          });

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
      };

      if (socket) {
        connectRTC();
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
    }
  }, [channelId, socket]);

  return {
    peers,
    myAudio,
    audioRefs,
    audioRefsDispatch,
  };
}
