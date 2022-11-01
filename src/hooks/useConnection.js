import { useEffect, useReducer, useRef, useState } from "react";
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
  const peersRef = useRef([]);

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
              config: {
                iceServers: [
                  { urls: "stun:stun.l.google.com:19302" },
                  { urls: "stun:stun1.l.google.com:19302" },
                  { urls: "stun:stun2.l.google.com:19302" },
                  { urls: "stun:stun3.l.google.com:19302" },
                  { urls: "stun:stun4.l.google.com:19302" },
                  {
                    url: "turn:turn.bistri.com:80",
                    credential: "homeo",
                    username: "homeo",
                  },
                  {
                    url: "turn:turn.anyfirewall.com:443?transport=tcp",
                    credential: "webrtc",
                    username: "webrtc",
                  },
                ],
              },
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

          peersRef.current = newPeers;

          peersDispatch({ type: peersAction.INIT, payload: newPeers });
        });

        socket.on(CHANNEL.USER_JOIN, (payload) => {
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
            config: {
              iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
                { urls: "stun:stun2.l.google.com:19302" },
                { urls: "stun:stun3.l.google.com:19302" },
                { urls: "stun:stun4.l.google.com:19302" },
                {
                  url: "turn:turn.bistri.com:80",
                  credential: "homeo",
                  username: "homeo",
                },
                {
                  url: "turn:turn.anyfirewall.com:443?transport=tcp",
                  credential: "webrtc",
                  username: "webrtc",
                },
              ],
            },
          });

          peer.on("signal", (signal) => {
            socket.emit(CHANNEL.ANSWER, {
              callerId: payload.callerId,
              signal,
            });
          });

          peer.id = payload.callerId;

          peer.signal(payload.signal);

          peersRef.current.push(peer);

          peersDispatch({ type: peersAction.ADD, payload: peersRef });
        });

        socket.on(CHANNEL.RETURN_SIGNAL, (payload) => {
          const targetPeer = peersRef.current.find(
            (peer) => peer.id === payload.calleeId
          );

          targetPeer.signal(payload.signal);
        });

        socket.on(CHANNEL.USER_DISCONNECT, (targetId) => {
          audioRefsDispatch({
            type: audioRefsAction.DELETE,
            payload: targetId,
          });

          const targetPeer = peersRef.current.find(
            (peer) => peer.id === targetId
          );

          targetPeer?.destroy();

          peersRef.current = peersRef.current.filter(
            (peer) => peer.id !== targetId
          );

          peersDispatch({ type: peersAction.DISCONNECT, payload: peersRef });
        });
      } catch (error) {
        setErr("미디어 장치가 없습니다");
      }
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
    err,
  };
}
