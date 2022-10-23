import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  FaMicrophoneAlt,
  FaMicrophoneAltSlash,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { theme } from "../../config/constants";
import { audioRefsAction } from "../../reducer/actions";
import useConnection from "../../hooks/useConnection";
import Header from "../../components/Header";
import AudioContainer from "../../components/AudioContainer";

export default function ChannelPage() {
  const { channelId } = useParams();
  const [isOnMic, setIsOnMic] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const volumeControlRef = useRef(null);
  const navigate = useNavigate();

  const { peers, myAudio, audioRefs, audioRefsDispatch } =
    useConnection(channelId);

  const volumeOnChange = (e) => {
    const numValue = Number(e.target.value);

    setVolumeValue(numValue);
    audioRefsDispatch({
      type: audioRefsAction.VOLUME,
      payload: numValue,
    });
  };

  const muteController = () => {
    if (!isMute) {
      audioRefsDispatch({ type: audioRefsAction.MUTE });
    } else {
      audioRefsDispatch({ type: audioRefsAction.ON });
    }

    setIsMute(!isMute);
  };

  const handleOnMic = () => {
    if (isOnMic) {
      myAudio.current.pause();
    } else {
      myAudio.current.play();
    }

    setIsOnMic(!isOnMic);
  };

  const micController = isOnMic ? (
    <OnMicIcon onClick={handleOnMic} />
  ) : (
    <OffMicIcon onClick={handleOnMic} />
  );

  const volumeController = isMute ? (
    <OffVolumeIcon onClick={muteController} />
  ) : (
    <OnVolumeIcon onClick={muteController} />
  );

  return (
    <Container>
      <Header />
      <ChannelInfoWrapper>
        <ChannelInfo>
          <ChannelTitle># 바코</ChannelTitle>
          <AudioContainer
            myAudio={myAudio}
            peers={peers}
            audioRefsDispatch={audioRefsDispatch}
          />
          <ChannelDescription>
            {audioRefs.length + 1}명 접속중 입니다
          </ChannelDescription>
        </ChannelInfo>
      </ChannelInfoWrapper>
      <ControllerWrapper>
        <ControllerItemWrapper>
          {micController}
          {volumeController}
        </ControllerItemWrapper>
        <VolumeBar
          type="range"
          max={1}
          min={0}
          step={0.01}
          value={volumeValue}
          ref={volumeControlRef}
          onChange={volumeOnChange}
          disabled={isMute}
        />
        <LeaveButton onClick={() => navigate("/", { replace: true })}>
          채널 떠나기
        </LeaveButton>
      </ControllerWrapper>
    </Container>
  );
}

const Container = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  background-color: ${theme.white};
`;

const ChannelInfoWrapper = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 10px;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${theme.channelBackGround};
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

const ChannelTitle = styled.p`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChannelDescription = styled.p`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControllerWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const ControllerItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
`;

const OnMicIcon = styled(FaMicrophoneAlt)`
  font-size: 32px;
`;

const OffMicIcon = styled(FaMicrophoneAltSlash)`
  font-size: 32px;
`;

const OnVolumeIcon = styled(FaVolumeUp)`
  font-size: 32px;
`;

const OffVolumeIcon = styled(FaVolumeMute)`
  font-size: 32px;
`;

const LeaveButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.skyBlue};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    @include transition(all 0.5s ease);
  }
`;

const VolumeBar = styled.input``;
