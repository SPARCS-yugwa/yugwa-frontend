import React, { useState, useEffect } from "react";
import styled from "styled-components";
import blueHome from "../assets/icons/Vector-4.png";
import home from "../assets/icons/octicon_home-fill-24-1.png";
import blueChat from "../assets/icons/Group.png";
import chat from "../assets/icons/Group-1.png";
import blueUser from "../assets/icons/ion_person.png";
import user from "../assets/icons/ion_person-1.png";
import { useNavigate } from "react-router-dom";

const FootWrap = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  padding: 10px;
`;

const Footer = ({ where }) => {
  const [homeIcon, setHomeIcon] = useState(home);
  const [chatIcon, setChatIcon] = useState(chat);
  const [userIcon, setUserIcon] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (where == 0) {
      setHomeIcon(blueHome);
      setChatIcon(chat);
      setUserIcon(user);
    } else if (where == 1) {
      setHomeIcon(home);
      setChatIcon(blueChat);
      setUserIcon(user);
    } else {
      setHomeIcon(home);
      setChatIcon(chat);
      setUserIcon(blueUser);
    }
  }, [where]);

  return (
    <FootWrap>
      <Icon src={homeIcon} onClick={() => navigate("/home")} />
      <Icon src={chatIcon} onClick={() => navigate("/community")} />
      <Icon src={userIcon} onClick={() => navigate("/mypage")} />
    </FootWrap>
  );
};

export default Footer;
