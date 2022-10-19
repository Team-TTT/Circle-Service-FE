import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function ServiceLayOut() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
