import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import theme from "../../config/constants/theme";

export default function HomePage() {
  const { projectInfo } = useOutletContext();

  return (
    <Container>
      <FixedDescription>
        환영합니다
        <br />
        채널 버튼을 클릭하여 대화에 참여해보세요.
      </FixedDescription>
      <ChannelsWrapper>
        {projectInfo.channels
          .filter((channel) => channel.isActive)
          .map((channel) => (
            <ChannelBox key={channel._id}>
              <ChannelItem
                to={`/projects/${projectInfo._id}/channels/${channel._id}`}
              >
                <ChannelTitle>{channel.title}</ChannelTitle>
                <ChannelDescription>{channel.description}</ChannelDescription>
              </ChannelItem>
            </ChannelBox>
          ))}
      </ChannelsWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: ${theme.skyBlue};
`;

const FixedDescription = styled.p`
  font-size: 20px;
  line-height: 30px;
  margin: 0px auto;
`;

const ChannelsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 340px;
  min-height: 340px;
`;

const ChannelBox = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${theme.white};

  &:hover {
    background-color: ${theme.gray};
    color: ${theme.white};
    transition: all 0.3s ease-in-out;
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
