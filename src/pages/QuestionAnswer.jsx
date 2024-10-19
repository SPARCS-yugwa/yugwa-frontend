import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
`;

const Wrap = styled.div`
  padding: 0px 26px;
`;

const TrustView = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ViewText = styled.h3`
  padding: 10px;
  color: #5752d9;
  font-size: 15px;
  font-wieght: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const TrustBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: #e6ebf9;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
`;

const fillAnimation = (trustValue) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${trustValue}%;
  }
`;

const TrustFill = styled.div`
  height: 100%;
  background-color: #4f7eff;
  width: 0%;
  animation: ${({ trustValue }) => fillAnimation(trustValue)} 2s ease forwards;
`;

const Card = styled.div`
  border-radius: 16px;
  border: 1px solid #4f7eff;
  background-color: #f3f8ff;
  padding: 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TrustWrap = styled.div`
  padding: 6px 13px;
  border-radius: 111px;
  display: flex;
  background-color: #bacdff;
  align-items: center;
`;

const TrustText = styled.h1`
  color: #5752d9;
  font-size: 13px;
  font-weight: 500;
  margin-top: 2px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0px;
`;

const Content = styled.span`
  font-size: 14px;
  color: #474c55;
  line-height: 150%;
`;

const Btn = styled.button`
  width: 100%;
  border: none;
  background-color: #4f7eff;
  color: white;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 16px;
  height: 52px;
`;

const getTrustExplain = (trustValue) => {
  let trustExplain = "";

  if (trustValue >= 90) {
    trustExplain = "신뢰도가 매우 높습니다.";
  } else if (trustValue >= 70) {
    trustExplain = "높은 신뢰도를 가지고 있습니다.";
  } else if (trustValue >= 40) {
    trustExplain = "낮은 신뢰도를 가지고 있습니다.";
  } else {
    trustExplain = "신뢰도가 매우 낮습니다.";
  }

  return trustExplain;
};

const QuestionAnswer = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState({
    trustValue: 67,
    title: "mbti 상관관계",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi velit illo nam explicabo optio deserunt, officiis sapiente provident culpa fuga saepe accusantium dolore sequi dicta, totam dolor. Sint, nemo.",
  });

  //데이터 가져오는 로직 넣기
  useEffect(() => {}, []);

  return (
    <div className="All">
      <HomeWrapper>
        <Header headerText={"유사과학 답변보기"} navTo={"/search"} />
        <Wrap>
          <TrustView>
            <ViewText>{getTrustExplain(fetchedData.trustValue)}</ViewText>
            <TrustBar>
              <TrustFill trustValue={fetchedData.trustValue} />
            </TrustBar>
          </TrustView>
          <Card>
            <TrustWrap>
              <TrustText>신뢰도: {fetchedData.trustValue}</TrustText>
            </TrustWrap>
            <Title>{fetchedData.title}</Title>
            <Content>{fetchedData.content}</Content>
          </Card>
          <Btn
            onClick={() => {
              navigate("/home");
            }}
          >
            논문 검색을 통해 확실한 정보 찾아보기
          </Btn>
          <Btn
            onClick={() => {
              navigate("/home");
            }}
          >
            홈으로 돌아가기
          </Btn>
        </Wrap>
      </HomeWrapper>
    </div>
  );
};

export default QuestionAnswer;
