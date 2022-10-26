import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

export default function CloseTooltip({ children, message }) {
  return (
    <Container>
      {children}
      <Content id="tooltip">
        <TextBox>{message}</TextBox>
      </Content>
    </Container>
  );
}

CloseTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired,
};

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover > #tooltip,
  &:active > #tooltip {
    display: block;
  }
`;

const boxFade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Content = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  animation: ${boxFade} 0.2s ease;
  z-index: 9;
`;

const TextBox = styled.div`
  position: relative;
  width: 100px;
  background: #484848;
  border-radius: 5px;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  color: white;
  left: -70px;
  -webkit-box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.64);
  box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.64);

  &:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 10px 10px;
    border-color: #484848 transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -10px;
    left: 83px;
  }
`;
