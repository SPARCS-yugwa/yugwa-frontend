import React, { useEffect, useState } from "react";
import styled from "styled-components";
import head from "../assets/images/head.png";
import { useNavigate } from "react-router-dom";
import TalkCard from "../components/TalkCard";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { getVotes } from "../APIs/voteAPi";
import first from "../assets/images/first.png";
import second from "../assets/images/second.png";
import { useRecoilState } from "recoil";
import { userDataState, userIdState } from "../store/atoms";
import { jwtDecode } from "jwt-decode"; // jwt-decode를 named import로 수정

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const Header = styled.div`
  padding: 10px 13px;
  border-bottom: 1px solid #e6ebf9;
`;

const HeaderImg = styled.img`
  width: 89px;
  height: 40px;
`;

const MainWrap = styled.div`
  padding: 22px 12px;
  padding-top: 0px;
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const Img = styled.img`
  width: 77px;
  height: 77px;
  /* position: absolute; */
  /* top: 50%; */
  margin: auto;
`;

const Select1 = styled.div`
  box-sizing: border-box;
  width: 50%;
  height: 200px;
  border-radius: 8px;
  border: 1px solid #4f7eff;
  background-color: #f2f6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Select2 = styled.div`
  box-sizing: border-box;
  width: 50%;
  height: 200px;
  border-radius: 8px;
  border: 1px solid #d0d7fb;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SelectText = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #5752d9;
  position: absolute;
  bottom: 24px;
  margin: auto;
`;

const BoldText = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Carousel = styled.div`
  overflow: hidden;
  position: relative;
`;

const ChevronIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
  color: #1c1e1f;
  z-index: 1;

  &:hover {
    color: #4f7eff;
  }
`;

const ChevronRight = styled(ChevronIcon)`
  right: 10px;
`;

const ChevronLeft = styled(ChevronIcon)`
  left: 10px;
`;
const UserWrap = styled.div`
  border-bottom: 3px solid #e6ebf9;
`;

const UserInfo = styled.div`
  padding: 20px 25px;
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Nickname = styled.h1`
  color: #26282b;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const GrayText = styled.h1`
  font-size: 14px;
  color: #9fa4a9;
  font-weight: 400;
`;

const Home = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);
  const [myList, setMyList] = useState([]);
  const [cardIdx, setCardIdx] = useState(0);

  // Recoil에서 사용자 데이터와 ID 상태를 가져옴
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userId, setUserId] = useRecoilState(userIdState);

  useEffect(() => {
    const getData = async () => {
      const response = (await getVotes()) || [];
      setMyList(response.map((item) => item.id));
      setFetchedData(response);
    };

    // JWT에서 사용자 데이터 추출
    const token = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 가져오기
    const decoded = jwtDecode(token);

    console.log("jwt : ", decoded);
    setUserId(decoded.id);
    setUserData(decoded);

    getData();
  }, [setUserData, setUserId]);

  // 카드 인덱스를 순환하여 Carousel 동작
  const handlePrevClick = () => {
    setCardIdx((prevIdx) =>
      prevIdx === 0 ? fetchedData.length - 1 : prevIdx - 1
    );
  };

  const handleNextClick = () => {
    setCardIdx((prevIdx) =>
      prevIdx === fetchedData.length - 1 ? 0 : prevIdx + 1
    );
  };

  return (
    <div className="All">
      <HomeWrapper>
        <Header>
          <HeaderImg src={head} alt="Header Image" />
        </Header>
        <MainWrap>
          <UserWrap>
            <UserInfo>
              <Profile src={userData.imageUrl || ""} alt="Profile" />
              <div>
                <Nickname>{userData.nickname || "Guest"}</Nickname>{" "}
                {/* name 수정 */}
                <GrayText>
                  초급 Lv.{parseInt(userData.expLevel / 100) + 1}
                </GrayText>{" "}
                {/* exp 수정 */}
              </div>
            </UserInfo>
          </UserWrap>
          <SelectWrap>
            <Select1 onClick={() => navigate("/question")}>
              <Img src={first} />
              <SelectText>유사과학 물어보기</SelectText>
            </Select1>
            <Select2 onClick={() => navigate("/search")}>
              <Img src={second} />
              <SelectText>논문 검색</SelectText>
            </Select2>
          </SelectWrap>
          <BoldText>인기 있는 논의 주제</BoldText>
          <Carousel>
            <ChevronLeft icon={faChevronLeft} onClick={handlePrevClick} />
            <ChevronRight icon={faChevronRight} onClick={handleNextClick} />
            {fetchedData.map(
              (data, index) =>
                index === cardIdx && (
                  <TalkCard
                    key={index}
                    id={data.id}
                    title={data.title}
                    category={data.category}
                    vote1={data.voteElements[0].count}
                    vote2={data.voteElements[1].count}
                    vote1Title={data.voteElements[0].title}
                    vote2Title={data.voteElements[1].title}
                    date={data.regDate}
                    commentCnt={data.commentCnt}
                    vote1id={data.voteElements[0].id}
                    vote2id={data.voteElements[1].id}
                  />
                )
            )}
          </Carousel>
        </MainWrap>
        <Footer where={0} />
      </HomeWrapper>
    </div>
  );
};

export default Home;

/*
[
    {
        "id": 1,
        "title": "1번 투표 입니다",
        "totalCount": 1,
        "voteElements": [
            {
                "id": 1,
                "title": "1번항목",
                "count": 0
            },
            {
                "id": 2,
                "title": "2번항목",
                "count": 1
            }
        ],
        "regDate": "2024-10-17T16:47:32.214",
        "category": "과학",
        "replyCount": 0
    }
]
*/