import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";

import { theme } from "../../config/constants";

export default function HomePage() {
  const { projectInfo } = useOutletContext();

  return (
    <Container>
      <Header />
      <DescriptionWrapper>
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
  height: 350px;
  min-height: 350px;
`;

const ChannelBox = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${theme.white};

  &:hover {
    background-color: ${theme.lightGray};
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
