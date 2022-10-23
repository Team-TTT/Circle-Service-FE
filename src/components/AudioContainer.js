import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Peer from "simple-peer";

import CalleeAudio, { StyledAudio, UserIcon } from "./CalleeAudio";

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
      <UserIcon />
      <StyledAudio ref={myAudio} playsInline />
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
