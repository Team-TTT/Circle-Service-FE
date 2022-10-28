import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Peer from "simple-peer";

import { audioRefsAction } from "../../reducer/actions";
import LoadingIcon from "../shared/LoadingUserIcon";
import UserIcon from "../shared/UserIcon";
import StyledAudio from "../shared/StyledAudio";
import AudioWrapper from "../shared/AudioWrapper";

export default function CalleeAudio({ peer, audioRefsDispatch }) {
  const audioRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    peer.on("stream", (stream) => {
      audioRef.current.srcObject = stream;
      audioRef.current.play().catch(() => {
        window.location.reload(true);
      });

      const audioRefInfo = {
        audioRef,
        id: peer.id,
      };

      setIsLoading(false);
      audioRefsDispatch({ type: audioRefsAction.ADD, payload: audioRefInfo });
    });
  }, [audioRefsDispatch, navigate, peer]);

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
