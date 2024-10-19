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
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
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

const Home = () => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);
  const [myList, setMyList] = useState([]);

  // Dummy data 배열 생성
  const dummyDatas = [
    {
      title: "enfp는 사람이 아님",
      category: "mbti",
      vote1: 10,
      vote2: 15,
      vote1Title: "사람이다",
      vote2Title: "사람아니다",
      date: "2024.10.17",
      commentCnt: 10,
    },
    {
      title: "고양이가 개보다 똑똑해?",
      category: "동물",
      vote1: 50,
      vote2: 45,
      vote1Title: "그렇다",
      vote2Title: "아니다",
      date: "2024.10.16",
      commentCnt: 5,
    },
    {
      title: "AI는 인간을 지배할 것인가?",
      category: "AI",
      vote1: 20,
      vote2: 30,
      vote1Title: "그렇다",
      vote2Title: "아니다",
      date: "2024.10.15",
      commentCnt: 12,
    },
  ];

  const [cardIdx, setCardIdx] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const response = (await getVotes()) || [];
      setMyList(response.map((item) => item.id));
      // console.log(myList);

      setFetchedData(response);
    };
    getData();
    // console.log(myList);
  }, []);

  // 인덱스를 순환하여 카드를 표시하기 위한 로직
  const handlePrevClick = () => {
    setCardIdx((prevIdx) =>
      prevIdx === 0 ? dummyDatas.length - 1 : prevIdx - 1
    );
  };

  const handleNextClick = () => {
    setCardIdx((prevIdx) =>
      prevIdx === dummyDatas.length - 1 ? 0 : prevIdx + 1
    );
  };

  return (
    <div className="All">
      <HomeWrapper>
        <Header>
          <HeaderImg src={head} alt="Header Image" />
        </Header>
        <MainWrap>
          <SelectWrap>
            <Select1 onClick={() => navigate("/search")}>
              <SelectText>유사과학 검색</SelectText>
            </Select1>
            <Select2 onClick={() => navigate("/chatbot")}>
              <SelectText>AI에게 물어보기</SelectText>
            </Select2>
          </SelectWrap>
          <BoldText>인기 있는 논의 주제</BoldText>
          <Carousel>
            <ChevronLeft icon={faChevronLeft} onClick={handlePrevClick} />
            <ChevronRight icon={faChevronRight} onClick={handleNextClick} />
            {/* 카드 데이터 순환 */}
            {fetchedData.map(
              (data, index) =>
                index == cardIdx && (
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
