import { audioRefsAction, peersAction } from "./actions";

export const peersReducer = (state, { type, payload }) => {
  if (type === peersAction.INIT) {
    return payload;
  }

  if (type === peersAction.ADD) {
    return [...state, payload];
  }

  if (type === peersAction.DISCONNECT) {
    return state.filter((peer) => peer.id !== payload);
  }

  return state;
};

export const audioRefsReducer = (state, { type, payload }) => {
  if (type === audioRefsAction.ADD) {
    return [...state, payload];
  }

  if (type === audioRefsAction.DELETE) {
    return state.filter((refInfo) => refInfo.id !== payload);
  }

  if (type === audioRefsAction.MUTE) {
    state
      .map((audioRefInfo) => audioRefInfo.audioRef.current)
      .forEach((audioEl) => audioEl.pause());

    return state;
  }

  if (type === audioRefsAction.ON) {
    state
      .map((audioRefInfo) => audioRefInfo.audioRef.current)
      .forEach((audioEl) => audioEl.play());

    return state;
  }

  return state;
};
