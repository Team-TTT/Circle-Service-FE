/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { audioRefsAction, peersAction } from "./actions";

export const peersReducer = (state, { type, payload }) => {
  if (type === peersAction.INIT) {
    return payload;
  } else if (type === peersAction.SIGNAL) {
    const targetPeer = state.find((peer) => peer.id === payload.calleeId);
    console.log(targetPeer, "시그널 이어주기_caller");
    targetPeer?.signal(payload.signal);

    return state;
  } else if (type === peersAction.DISCONNECT) {
    const targetPeer = state.find((peer) => peer.id === payload);
    targetPeer?.destroy();
    console.log(payload, "disconnet");

    return state.filter((peer) => peer.id !== payload);
  } else if (type === peersAction.ADD) {
    return [...state, payload];
  } else {
    return state;
  }
};

export const audioRefsReducer = (state, { type, payload }) => {
  if (type === audioRefsAction.ADD) {
    return [...state, payload];
  } else if (type === audioRefsAction.DELETE) {
    return state.filter((refInfo) => refInfo.id !== payload);
  } else if (type === audioRefsAction.VOLUME) {
    console.log("VOLUME");
    state
      .map((audioRefInfo) => audioRefInfo.audioRef.current)
      .forEach((audioEl) => {
        audioEl.volume = payload;
      });

    return state;
  } else if (type === audioRefsAction.MUTE) {
    console.log("MUTE");

    state
      .map((audioRefInfo) => audioRefInfo.audioRef.current)
      .forEach((audioEl) => {
        audioEl.pause();
      });

    return state;
  } else if (type === audioRefsAction.ON) {
    console.log("ON");

    state
      .map((audioRefInfo) => audioRefInfo.audioRef.current)
      .forEach((audioEl) => {
        audioEl.play();
      });

    return state;
  } else {
    return state;
  }
};
