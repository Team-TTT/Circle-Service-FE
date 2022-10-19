import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";

import theme from "../../config/constants/theme";

export default function HomePage() {
  const { projectInfo } = useOutletContext();

  return (
    <Container>
      <CloseButton>
        <CloseIcon />
        <p>테스트입니다</p>
      </CloseButton>
      <DescriptionWrapper>
        <Title>title</Title>
        <UserDescription>환영합니다!</UserDescription>
        <FixedDescription>
          채널 버튼을 클릭하여 대화에 참여해보세요.
        </FixedDescription>
      </DescriptionWrapper>
      <ChannelsWrapper>
        {projectInfo.channels.map(
          (channel) =>
            channel.isActive && (
              <ChannelBox key={channel._id}>
                <ChannelItem
                  to={`/projects/${projectInfo._id}/channels/${channel._id}`}
                >
                  <ChannelTitle># General</ChannelTitle>
                  <ChannelDescription>
                    자유롭게 대화를 나눠보세요
                  </ChannelDescription>
                </ChannelItem>
              </ChannelBox>
            )
        )}
      </ChannelsWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.skyBlue};
`;

const CloseButton = styled.button`
  margin-left: auto;
`;

const CloseIcon = styled(IoMdCloseCircleOutline)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
  font-size: 30px;
  cursor: pointer;
`;

const Title = styled.h1`
  padding-bottom: 20px;
  font-size: 50px;
`;

const DescriptionWrapper = styled.div`
  padding: 10px;
`;

const UserDescription = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
`;

const FixedDescription = styled.p``;

const ChannelsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 400px;
  min-height: 400px;
`;

const ChannelBox = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${theme.white};

  &:hover {
    background-color: ${theme.gray};
    color: ${theme.white};
    @include transition(all 0.5s ease);
  }
`;

const ChannelItem = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: ${theme.black};
  cursor: pointer;
`;

const ChannelTitle = styled.h2`
  margin-bottom: 5px;
  padding: 5px;
  font-size: 20px;
`;

const ChannelDescription = styled.p`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 5px;
  text-align: center;
  font-size: 14px;
`;
