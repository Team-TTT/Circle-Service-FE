/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import {
  FaUserAlt,
  FaMicrophoneAlt,
  FaMicrophoneAltSlash,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import theme from "../../config/constants/theme";

export default function ChannelPage() {
  const [isOnMic, setIsOnMic] = useState(true);
  const [isOnVolume, setIsOnVolume] = useState(true);

  const navigate = useNavigate();

  const micController = isOnMic ? <OnMicIcon /> : <OffMicIcon />;
  const volumeController = isOnVolume ? <OnVolumeIcon /> : <OffVolumeIcon />;

  return (
    <Container>
      <Header />
      <ChannelInfoWrapper>
        <ChannelInfo>
          <ChannelTitle># 바코</ChannelTitle>
          <UserWrapper>
            <UserIcon />
            <UserIcon />
            <UserIcon />
          </UserWrapper>
          <ChannelDescription> 몇명이 접속중이냐</ChannelDescription>
        </ChannelInfo>
      </ChannelInfoWrapper>
      <ControllerWrapper>
        <ControllerItemWrapper>
          {micController}
          {volumeController}
        </ControllerItemWrapper>
        <LeaveButton onClick={() => navigate("/")}>채널 떠나기</LeaveButton>
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

const UserWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px;
`;

const UserIcon = styled(FaUserAlt)`
  font-size: 50px;
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
  width: 100px;
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
