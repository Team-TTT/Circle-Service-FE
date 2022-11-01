import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Peer from "simple-peer";

import { audioRefsAction } from "../../reducer/actions";
import UserIcon from "../shared/UserIcon";
import StyledAudio from "../shared/StyledAudio";
import AudioWrapper from "../shared/AudioWrapper";
import Spinner from "../shared/Spinner";

export default function CalleeAudio({ peer, audioRefsDispatch }) {
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef();

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
      {isLoading ? <CustomSpinner /> : <UserIcon />}
      <StyledAudio autoplay ref={audioRef} />
    </AudioWrapper>
  );
}

CalleeAudio.propTypes = {
  peer: PropTypes.instanceOf(Peer).isRequired,
  audioRefsDispatch: PropTypes.func.isRequired,
};

const CustomSpinner = styled(Spinner)`
  width: 30px;
  height: 30px;
`;
