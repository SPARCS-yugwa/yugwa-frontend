import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircle,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import onboard1 from "../assets/images/onboard1.png";
import onboard2 from "../assets/images/onboard2.png";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { geolocationState, userDataState, locationState } from "../store/atoms";
import kakaka from "../assets/images/kakaka.png";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;
const DotWrapper = styled.div`
  height: 120px;
  /* background-color: rgba(0, 0, 0, 0.01); */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.i`
  color: #dfdff1;
  font-size: 6px;
  margin: 2px;
`;

const GreenDot = styled.i`
  font-size: 6px;
  margin: 2px;
  color: #4f7eff;
`;

const StartLink = styled.div`
  width: 320px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fee500;
  background-image: url(${kakaka}); /* 배경 이미지 설정 */
  background-size: cover; /* 배경 이미지가 전체를 덮도록 설정 */
  background-position: center; /* 배경 이미지가 중앙에 오도록 설정 */
  border-radius: 10px;
  margin: auto;
  z-index: 3;
  /* cursor: ${(props) => (props.active ? "pointer" : "default")}; */
  /* color: ${(props) => (props.active ? "black" : "white")}; */
  font-size: 16px;
  text-decoration: none;
  /* transition: all 0.3s ease-in-out; */
`;

const BtnWrap = styled.div`
  display: flex;
  height: 12%;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.h2`
  font-size: 24px;
  color: #1c1e1f;
  margin: 15px 0px 0px 30px;
`;

const SubText = styled.h4`
  font-size: 16px;
  color: #797982;
  font-weight: 500;
  margin: 10px 0px 0px 30px;
`;

const SubWrap = styled.div`
  margin-top: 30px;
`;

const ViewWrapper = styled.div`
  position: absolute;
  z-index: 3;
  width: 200%;
  display: flex;
  transform: translateX(${(props) => props.offset}%);
  transition: transform 0.3s ease-out;
`;

const View = styled.div`
  width: 100%;
`;

const Onboard1 = styled.div`
  z-index: 2;
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  transition: transform 0.3s ease-out; // 슬라이드 전환 효과
  transform: translateX(${(props) => props.offset}%);
`;
const Onboard2 = styled.div`
  z-index: 2;
  position: absolute;
  bottom: -3px;
  left: 100%;
  width: 100%;
  transition: transform 0.3s ease-out; // 슬라이드 전환 효과
  transform: translateX(${(props) => props.offset}%);
`;

const Chevron = styled.i`
  color: #b7c0c6;
  font-size: 20px;
  position: absolute;
  z-index: 1000;
  padding: 10px;

  cursor: pointer;
`;

const OnboardingPage = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [geoData, setGeoData] = useRecoilState(geolocationState);
  const [currentPage, setCurrentPage] = useState(0);
  const geolocation = useRecoilValue(geolocationState);
  const setLocation = useSetRecoilState(locationState);
  const [kakaoLogin, setKakaoLogin] = useState();
  const { kakao } = window;
  const url = process.env.REACT_APP_KAKAO;

  //환경 변수
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const handleNext = () => {
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage(0);
  };

  useEffect(() => {
    setKakaoLogin(process.env.REACT_APP_KAKAO);
    console.log(kakaoLogin);

    const token = localStorage.getItem("accessToken");
  }, [setUserData, setGeoData, setLocation]);

  const navigate = useNavigate();

  const handleClick = () => {
    if (currentPage === 1) {
      window.location.href = url;
    }
  };

  return (
    <HomeWrapper className="Home">
      {currentPage == 0 ? (
        <DotWrapper>
          <GreenDot>
            <FontAwesomeIcon icon={faCircle} />
          </GreenDot>
          <Dot>
            <FontAwesomeIcon icon={faCircle} />
          </Dot>
        </DotWrapper>
      ) : (
        <DotWrapper>
          <Dot>
            <FontAwesomeIcon icon={faCircle} />
          </Dot>
          <GreenDot>
            <FontAwesomeIcon icon={faCircle} />
          </GreenDot>
        </DotWrapper>
      )}
      <ViewWrapper offset={-50 * currentPage}>
        <View>
          <MainText>MBTI는 과학이 맞다니까?</MainText>
          <MainText></MainText>
          <SubWrap>
            <SubText>평소 궁금했던 생각을 논문 데이터를 </SubText>
            <SubText>활용해 근거를 찾아 알려드릴게요!</SubText>
            <SubText></SubText>
          </SubWrap>
        </View>
        <View>
          <MainText>다른 사람의 생각이 궁금해! </MainText>
          <MainText></MainText>
          <SubWrap>
            <SubText>관심 있는 유사과학 주제를 함께 투표하고,</SubText>
            <SubText>커뮤니티에서 이야기 나눠봐요!</SubText>
            {/* <SubText>다양한 경로를 추천해드려요</SubText> */}
          </SubWrap>
        </View>
      </ViewWrapper>
      <Onboard1 offset={-100 * currentPage}>
        <img src={onboard1} style={{ width: "100%" }} />
      </Onboard1>
      <Onboard2 offset={-100 * currentPage}>
        <img src={onboard2} style={{ width: "100%" }} />
      </Onboard2>
      {currentPage === 0 && (
        <Chevron style={{ bottom: "50%", right: "20px" }} onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Chevron>
      )}
      {currentPage === 1 && (
        <Chevron style={{ bottom: "50%" }} onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Chevron>
      )}

      <BtnWrap>
        <StartLink onClick={handleClick} active={currentPage === 1 ? 1 : 0}>
          {/* 유과 시작하기 */}
        </StartLink>
        {/* <StartLink
          onClick={() => navigate("/home")}
          active={currentPage === 1 ? 1 : 0}
        >
          유과 시작하기
        </StartLink> */}
      </BtnWrap>
    </HomeWrapper>
  );
};

export default OnboardingPage;
