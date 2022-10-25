import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
  return (
    <Container>
      <ErrorMessage>Internal Sever Error</ErrorMessage>
      <HomeLink to="/">Home</HomeLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.h1``;

const HomeLink = styled(Link)`
  display: block;
`;
