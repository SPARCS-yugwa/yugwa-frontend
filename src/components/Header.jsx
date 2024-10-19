import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Head = styled.div`
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid #e6ebf9;
`;

const HeaderText = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const Icon = styled.i`
  padding: 10px;
  position: absolute;
  left: 16px;
  /* top: 14px; */
  color: #4f7eff;
  font-size: 24px;
`;

const Header = ({ headerText, navTo }) => {
  const [nav, setNav] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setNav(navTo);
    if (nav == "") setNav(-1);
  }, []);
  return (
    <Head>
      <Icon onClick={() => navigate(nav)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Icon>
      <HeaderText>{headerText}</HeaderText>
    </Head>
  );
};

export default Header;
