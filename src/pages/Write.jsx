import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const Wrap = styled.form`
  padding: 0px 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d0d7fb;
  display: flex;
  padding: 10px 14px;
  align-items: center;
  box-sizing: border-box;
`;

const BlueText = styled.h1`
  color: #4f7eff;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 14px;
`;

const VoteWrap = styled.div`
  padding: 10px 10px;
  border: 1px solid #d0d7fb;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VoteInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #f1f4ff;
  display: flex;
  padding: 8px 8px;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #4f7eff;
  margin-top: 30px;
  height: 50px;
`;

const Write = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [vote1, setVote1] = useState("");
  const [vote2, setVote2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
    console.log("Form submitted");
    console.log({ title, category, vote1, vote2 });
    // 데이터를 서버로 전송하거나 다른 동작을 여기에 추가할 수 있음
  };

  return (
    <div className="All">
      <HomeWrapper>
        <Header headerText={"글 작성하기"} navTo={"/community"} />
        <Wrap onSubmit={handleSubmit}>
          <BlueText>유과의 제목</BlueText>
          <Input
            placeholder="논의하고 싶은 유사과학의 제목을 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
          />
          <BlueText>유과의 카테고리</BlueText>
          <Input
            placeholder="ex) MBTI"
            onChange={(e) => setCategory(e.target.value)}
          />
          <BlueText>선택지</BlueText>
          <VoteWrap>
            <VoteInput
              onChange={(e) => setVote1(e.target.value)}
              placeholder="선택지1을 적어주세요"
            ></VoteInput>
            <VoteInput
              onChange={(e) => setVote2(e.target.value)}
              placeholder="선택지2를 적어주세요"
            ></VoteInput>
          </VoteWrap>
          <Button type="submit">작성완료</Button>
        </Wrap>
      </HomeWrapper>
    </div>
  );
};

export default Write;
