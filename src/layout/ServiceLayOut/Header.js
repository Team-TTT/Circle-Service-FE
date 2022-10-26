import React from "react";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { theme } from "../../config/constants";
import CloseTooltip from "../../components/common/CloseTooltip";

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
      <ButtonWrapper>
        <CloseTooltip message="Back to Circle">
          <CloseButton onClick={handleCloseButton}>
            <CloseIcon />
          </CloseButton>
        </CloseTooltip>
      </ButtonWrapper>
      <Title>{title}</Title>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const Container = styled.div`
  position: relative;
  background-color: ${(props) => props.color};
`;

const ButtonWrapper = styled.div`
  display: inline;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
`;

const CloseIcon = styled(IoMdCloseCircleOutline)`
  position: relative;
  padding: 15px 15px 2px 2px;
  font-size: 30px;
  cursor: pointer;
`;

const Title = styled.h1`
  margin-left: 5px;
  padding-bottom: 10px;
  font-size: 30px;
`;
