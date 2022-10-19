import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function ServiceLayOut() {
  const [projectInfo, setProjectInfo] = useState({});

  useEffect(() => {
    fetch("/mockData/project.json")
      .then((res) => res.json())
      .then((data) => setProjectInfo(data));
  }, []);

  return (
    <Container>
      {projectInfo.title ? <Outlet context={{ projectInfo }} /> : null}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
