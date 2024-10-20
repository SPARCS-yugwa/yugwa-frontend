import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import gemini from "../components/gemini";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

const Wrap = styled.div`
  padding: 0px 26px;
  overflow: scroll;
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
  font-weight: 500;
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
    trustExplain = "일치도가 매우 높습니다.";
  } else if (trustValue >= 70) {
    trustExplain = "높은 일치도를 가지고 있습니다.";
  } else if (trustValue >= 40) {
    trustExplain = "낮은 일치도를 가지고 있습니다.";
  } else {
    trustExplain = "일치도가 매우 낮습니다.";
  }

  return trustExplain;
};

const QuestionAnswer = () => {
  const location = useLocation();
  const [text, setText] = useState();
  const [result, setResult] = useState();
  const { inputValue } = location.state || {};
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState({
    trustValue: 0,
    question: "다시 질문해주세요!",
    content:
      "연관관계 혹은 근거를 찾기 힘들어요 \n \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0다시 질문해주세요!",
    title: "없음",
  });

  const removeBackticks = (response) => {
    // 백틱 세 개로 시작하고 끝나는지 확인
    if (response.startsWith("```") && response.endsWith("```")) {
      // 백틱 세 개를 제거하고 반환
      return response.slice(3, -3);
    }
    return response; // 백틱이 없으면 원본 그대로 반환
  };
  // 데이터를 가져오는 로직 추가
  useEffect(() => {
    const fetchResult = async () => {
      try {
        setText(inputValue); // 입력값을 바로 설정
        const response = await gemini(inputValue); // gemini 함수를 비동기로 호출

        // response가 string으로 넘어온 경우, JSON.parse로 파싱
        const parsedResponse = JSON.parse(response);
        if (parseInt(parsedResponse.score, 10) != 0) {
          setFetchedData({
            trustValue: parseInt(parsedResponse.score, 10), // score를 숫자로 변환하여 trustValue로 설정
            question: parsedResponse.question,
            content: parsedResponse.content,
            title: parsedResponse.title,
          });
        }
        setIsLoading(false);
        // fetchedData 상태에 값 업데이트
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    fetchResult(); // 비동기 함수 호출
  }, [inputValue]); // inputValue가 변경될 때마다 useEffect 실행

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
            {isLoading && <Spinner />}
            {!isLoading && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TrustWrap>
                  <TrustText>일치도: {fetchedData.trustValue}</TrustText>
                </TrustWrap>
                <Title>{fetchedData.question}</Title>
                <Content style={{ whiteSpace: "pre-line" }}>
                  {fetchedData.content}
                </Content>
                <br></br>
                <div>참고한 논문: {fetchedData.title}</div>
              </div>
            )}
          </Card>
          <Btn
            onClick={() => {
              navigate("/question");
            }}
          >
            다시 물어보기
          </Btn>
          <Btn
            onClick={() => {
              navigate("/search");
            }}
          >
            논문 검색을 통해 확실한 정보 찾아보기
          </Btn>
        </Wrap>
        <Footer where={3} />
      </HomeWrapper>
    </div>
  );
};

export default QuestionAnswer;
