import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/common/Header";

import theme from "../../config/constants/theme";

export default function ServiceLayOut() {
  const [projectInfo, setProjectInfo] = useState({});
  const { channelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getServiceProject = async (projectId, secretKey) => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/projects/${projectId}/service/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ secretKey }),
        }
      );
      const result = await response.json();
      setProjectInfo(result);
    };

    const onLoadProject = (event) => {
      const { projectId, secretKey } = event.data;

      if (projectId && secretKey) {
        getServiceProject(projectId, secretKey);
        return;
      }
      if (event.origin !== process.env.PUBLIC_URL) {
        navigate("/error");
      }
    };
    window.addEventListener("message", onLoadProject);

    return () => {
      window.removeEventListener("message", onLoadProject);
    };
  }, [navigate, projectInfo]);

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
