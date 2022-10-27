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
  position: absolute;
  display: none;
  flex-direction: column;
  animation: ${boxFade} 0.2s ease;
  z-index: 9;
`;

const TextBox = styled.div`
  position: relative;
  left: -70px;
  width: 100px;
  padding: 8px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.64);
  box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.64);
  background: #484848;
  text-align: center;
  vertical-align: middle;
  color: white;

  &:after {
    content: "";
    position: absolute;
    top: -10px;
    left: 83px;
    display: block;
    width: 0;
    border-width: 0 10px 10px;
    border-color: #484848 transparent;
    border-style: solid;
    z-index: 1;
  }
`;
