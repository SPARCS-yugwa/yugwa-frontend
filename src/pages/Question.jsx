import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import send from "../assets/icons/send.png";
import logoIcon from "../assets/icons/yugwaLOGO.png";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/atoms";
import { fetchAndPlaySpeech, getReply } from "../APIs/chatbotAPI";
import Header from "../components/Header";
import gemini from "../components/gemini";

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
`;

const ContentWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
  padding: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  padding-left: 20px;
  box-sizing: border-box;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #e9efff;
  border-radius: 5px;
  margin-right: 16px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 5px;
  background: url(${send}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ChatButton = styled.button`
  background-color: white;
  border: 1px solid #a1c1ff;
  border-radius: 10px;
  padding: 26px 16px;
  font-size: 14px;
  font-weight: 550;
  line-height: 1.5;
  color: #5752d9;
  cursor: pointer;
  width: 150px;
  text-align: center;
  white-space: pre-line;
  &:hover {
    background-color: #f0f5ff;
  }
`;
const LogoIcon = styled.img`
  width: 56px;
  height: 56px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Question = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const userId = useRecoilValue(userIdState);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { text: inputValue, user: true }];
      setMessages(newMessages);
      setInputValue("");

      const reply = await getReply(userId, inputValue);
      gemini(inputValue);
      fetchAndPlaySpeech(reply.chat);
      const botMessage =
        reply && reply.chat
          ? reply.chat
          : "챗봇 서비스에 문제가 발생했습니다. 나중에 다시 시도해주세요.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, user: false },
      ]);
    }
  };

  return (
    <HomeWrapper className="All">
      <Header headerText={"유사과학 물어보기"} navTo={""} />
      <ContentWrap>
        <LogoIcon src={logoIcon} />
        <ButtonWrap>
          <ChatButton onClick={() => navigate("/questionAnswer")}>
            F는 진짜 {"\n"} 감성적인게 맞나요?
          </ChatButton>
          <ChatButton onClick={() => navigate("/questionAnswer")}>
            공부는 유전자가 {"\n"} 중요한가요?
          </ChatButton>
        </ButtonWrap>
      </ContentWrap>

      <InputWrapper>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="메시지를 입력해주세요."
        />
        <Button onClick={handleSend} />
      </InputWrapper>
    </HomeWrapper>
  );
};

export default Question;
