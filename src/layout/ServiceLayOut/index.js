import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import theme from "../../config/constants/theme";

export default function ServiceLayOut() {
  const [projectInfo, setProjectInfo] = useState({});

  useEffect(() => {
    const getProject = async () => {
      const response = await fetch("/mockData/project.json");
      const data = await response.json();
      setProjectInfo(data);
    };

    getProject();
  }, []);

  return (
    <Container>
      {projectInfo.title ? <Outlet context={{ projectInfo }} /> : <Loading />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: ${theme.skyBlue};
  font-size: 16px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
`;
