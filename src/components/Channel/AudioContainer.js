import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Peer from "simple-peer";

import CalleeAudio from "./CalleeAudio";
import AudioWrapper from "../shared/AudioWrapper";
import UserIcon from "../shared/UserIcon";
import StyledAudio from "../shared/StyledAudio";

export default function AudioContainer({ peers, myAudio, audioRefsDispatch }) {
  return (
    <Container>
      {peers.map((peer) => (
        <CalleeAudio
          key={peer.id}
          peer={peer}
          audioRefsDispatch={audioRefsDispatch}
        />
      ))}
      <MyAudioWrapper>
        <UserIcon />
        <StyledAudio
          ref={myAudio}
          playsInline
          autoPlay
          onLoadStart={() => {
            // eslint-disable-next-line no-param-reassign
            myAudio.current.volume = 0;
          }}
        />
      </MyAudioWrapper>
    </Container>
  );
}

AudioContainer.propTypes = {
  peers: PropTypes.arrayOf(PropTypes.instanceOf(Peer)).isRequired,
  myAudio: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  audioRefsDispatch: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MyAudioWrapper = styled(AudioWrapper)``;
