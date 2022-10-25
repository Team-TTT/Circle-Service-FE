/* eslint-disable no-param-reassign */
const mute = (stream) => {
  stream.getTracks().forEach((track) => {
    track.enabled = false;
  });
};

const play = (stream) => {
  stream.getTracks().forEach((track) => {
    track.enabled = true;
  });
};

export default {
  mute,
  play,
};
