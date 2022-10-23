import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <Title>Vanila</Title>
      <CloseButton>
        <CloseIcon />
      </CloseButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 2.75em;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 32px;
`;

const Title = styled.h3``;

const CloseButton = styled.button`
  overflow: visible;
  top: 0;
  right: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  background: inherit;
  box-shadow: none;
  cursor: pointer;
`;

const CloseIcon = styled(IoMdCloseCircleOutline)`
  font-size: 32px;
`;
