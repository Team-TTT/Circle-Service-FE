import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/common/Header";

import theme from "../../config/constants/theme";

export default function ServiceLayOut() {
  const [projectInfo, setProjectInfo] = useState({});
  const { channelId } = useParams();
  const userProjectId = "6353fa78f312cdeb9b5994d8";
  const userSecretKey = "b660715ad7ebb171aa0ada977bc124d3";

  useEffect(() => {
    // 서버 배포후 url로 수정할 예정
    // eslint-disable-next-line no-unused-vars
    const getServiceProject = async (projectId, secretKey) => {
      const response = await fetch(
        `http://localhost:8080/projects/${projectId}/service/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(secretKey),
        }
      );
      const result = await response.json();
      setProjectInfo(result);
    };
    getServiceProject(userProjectId, userSecretKey);
  }, []);
  return (
    <Container color={channelId ? theme.white : theme.skyBlue}>
      {projectInfo?.title ? (
        <>
          <Header title={projectInfo.title} />
          <Outlet context={{ projectInfo }} />
        </>
      ) : (
        <Loading />
      )}
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
