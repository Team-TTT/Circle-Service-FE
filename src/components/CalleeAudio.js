import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaStreetView, FaUserAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import Peer from "simple-peer";
import { audioRefsAction } from "../reducer/actions";

export default function CalleeAudio({ peer, audioRefsDispatch }) {
  const audioRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    peer.on("stream", (stream) => {
      audioRef.current.srcObject = stream;
      audioRef.current.play();

      const audioRefInfo = {
        audioRef,
        id: peer.id,
      };

      setIsLoading(false);
      audioRefsDispatch({ type: audioRefsAction.ADD, payload: audioRefInfo });
    });
  }, [audioRefsDispatch, peer]);

  return (
    <AudioWrapper>
      {isLoading ? <LoadingIcon /> : <UserIcon />}
      <StyledAudio playsInline autoPlay ref={audioRef} />
    </AudioWrapper>
  );
}

CalleeAudio.propTypes = {
  peer: PropTypes.instanceOf(Peer).isRequired,
  audioRefsDispatch: PropTypes.func.isRequired,
};

const AudioWrapper = styled.div`
  position: relative;
`;

export const StyledAudio = styled.video`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 30px;
`;

export const UserIcon = styled(FaUserAlt)`
  font-size: 50px;
`;

const LoadingIcon = styled(FaStreetView)`
  font-size: 30px;
`;
