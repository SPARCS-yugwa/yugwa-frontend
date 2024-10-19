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
  border-radius: 10px;
  margin: auto;
  z-index: 3;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  color: ${(props) => (props.active ? "black" : "white")};
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
  const { kakao } = window;

  //환경 변수
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const handleNext = () => {
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage(0);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("https://ddubam.site/api/members/1");
    //     const data = await response.json();
    //   } catch (error) {
    //     console.error("Failed to fetch user data:", error);
    //   }
    // };
    // fetchData();
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
    //       setGeoData({ latitude, longitude });
    //       const geocoder = new kakao.maps.services.Geocoder();
    //       const callback = function (result, status) {
    //         if (status === kakao.maps.services.Status.OK) {
    //           const address =
    //             result[0].region_1depth_name +
    //             " " +
    //             result[0].region_2depth_name;
    //           setLocation(address);
    //         } else {
    //           console.log("Geocoder failed due to: " + status);
    //         }
    //       };
    //       geocoder.coord2RegionCode(
    //         position.coords.longitude,
    //         position.coords.latitude,
    //         callback
    //       );
    //     },
    //     (error) => {
    //       console.error("Geolocation error:", error);
    //     }
    //   );
    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }
  }, [setUserData, setGeoData, setLocation]);

  const navigate = useNavigate();

  const handleClick = () => {
    if (currentPage === 1) {
      window.location.href = "https://ddubam.site/api/members/kakao/login/test";
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
          <MainText>언제나 궁금한 ~~ 과학이야 </MainText>
          <MainText></MainText>
          <SubWrap>
            <SubText>논문과 무엇무엇을 통해</SubText>
            <SubText>내가 평상시 궁금하던 유사과학을 검증해봐요</SubText>
            <SubText></SubText>
          </SubWrap>
        </View>
        <View>
          <MainText>다른 사람이 이렇다는데? </MainText>
          <MainText></MainText>
          <SubWrap>
            <SubText>커뮤니티를 기반으로 투표하여</SubText>
            <SubText>유사과학에 어떤 과학이 있는지 이야기해봐요</SubText>
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
        {/* <StartLink onClick={handleClick} active={currentPage === 1 ? 1 : 0}>
          유과 시작하기
        </StartLink> */}
        <StartLink
          onClick={() => navigate("/home")}
          active={currentPage === 1 ? 1 : 0}
        >
          유과 시작하기
        </StartLink>
      </BtnWrap>
    </HomeWrapper>
  );
};

export default OnboardingPage;
