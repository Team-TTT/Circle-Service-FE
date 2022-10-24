import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/common/Header";

import theme from "../../config/constants/theme";

export default function ServiceLayOut() {
  const [projectInfo, setProjectInfo] = useState({});
  const { channelId } = useParams();

  // useEffect(() => {
  //   window.addEventListener("message", (event) => {
  //     if (event.data.functionName === "showServiceProject") {
  //       setProjectInfo(event.data.params);
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const projectId = "6353fa78f312cdeb9b5994d8";
    const secretKey = "b660715ad7ebb171aa0ada977bc124d3";
    // 서버 배포후 url로 수정할 예정
    const getServiceProject = async () => {
      const response = await fetch(
        `http://localhost:8080/projects/${projectId}/service/auth`,
        {
          method: "POST",
          body: JSON.stringify({ secretKey }),
        }
      );
      setProjectInfo(response);
    };
    getServiceProject();
  }, []);
  // 에러가 나면 iframe 빈 하늘색 창이 보임 -> 이것도 안 보이게 해야 함.
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
