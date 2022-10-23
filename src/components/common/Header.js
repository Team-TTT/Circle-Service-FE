import React from "react";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { theme } from "../../config/constants";

export default function Header({ title }) {
  const { channelId } = useParams();

  const handleCloseButton = () => {
    const circleButton = document.getElementById("core-circle");
    const circleService = document.getElementById("iframe-circle");

    circleButton.style.opacity = 1;
    circleService.style.visibility = "hidden";
  };

  return (
    <Container color={channelId ? theme.white : theme.skyBlue}>
      <CloseButton onClick={handleCloseButton}>
        <CloseIcon />
      </CloseButton>
      <Title>{title}</Title>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const Container = styled.div`
  background-color: ${(props) => props.color};
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  border: none;
  background-color: transparent;
`;

const CloseIcon = styled(IoMdCloseCircleOutline)`
  position: relative;
  margin: 15px;
  font-size: 30px;
  cursor: pointer;
`;

const Title = styled.h1`
  margin-left: 5px;
  padding-bottom: 10px;
  font-size: 30px;
`;
