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
  } else {
    return state;
  }
};
