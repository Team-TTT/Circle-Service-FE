import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

import theme from "../../config/constants/theme";

export default function ServiceLayOut() {
  const [projectInfo, setProjectInfo] = useState({});
  const { channelId } = useParams();

  useEffect(() => {
    if (process.env.REACT_APP_NODE_ENV === "development") {
      const getData = async () => {
        const response = await fetch("/mockData/mock.json");

        const data = await response.json();
        setProjectInfo(data);
      };

      getData();

      return;
    }

    const onLoadProject = (event) => {
      if (event.data) {
        setProjectInfo(JSON.parse(event.data));
      }
    };

    window.addEventListener("message", onLoadProject);
    window.parent.postMessage("getData", "*");

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener("message", onLoadProject);
    };
  }, []);

  return (
    <Container color={channelId ? theme.white : theme.skyBlue}>
      <Header title={projectInfo.title} />
      {projectInfo?.title ? <Outlet context={{ projectInfo }} /> : <Loading />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  border-radius: 30px;
  background-color: ${(props) => props.color};
  font-size: 16px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
`;
