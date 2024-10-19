import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import writeImg from "../assets/images/writebtn.png";
import Footer from "../components/Footer";
import TalkCard from "../components/TalkCard";
import { useNavigate } from "react-router-dom";
import { getVotes } from "../APIs/voteAPi";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const Write = styled.img`
  position: absolute;
  right: 25px;
  bottom: 100px;
  width: 60px;
  height: 60px;
  z-index: 3;
`;

const Wrap = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  gap: 10px;
  overflow: auto; /* auto로 수정 */
  height: calc(100vh - 150px); /* 고정된 높이 설정 */
`;

const Text = styled.h1`
  font-size: 14px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 15px;
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Community = () => {
  const navigate = useNavigate();
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
      id: 1,
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
      id: 1,
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
      id: 1,
    },
  ];
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = (await getVotes()) || [];
      // console.log(myList);

      setFetchedData(response);
    };
    getData();
    // console.log(myList);
  }, []);

  return (
    <div className="All">
      <HomeWrapper>
        <Header navTo={"/home"} headerText={"커뮤니티"} />

        <Write src={writeImg} onClick={() => navigate("/write")} />
        <Wrap>
          <Text>함께하는 유사과학 이야기</Text>
          <CardWrap>
            {fetchedData.map((data, index) => {
              return (
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
              );
            })}
          </CardWrap>
        </Wrap>
        <Footer where={1} />
      </HomeWrapper>
    </div>
  );
};

export default Community;
