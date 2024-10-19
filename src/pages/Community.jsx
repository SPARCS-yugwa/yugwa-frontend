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
  overflow: auto;
  height: calc(100vh - 150px);
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
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = (await getVotes()) || [];
        setFetchedData(response); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    getData();
  }, []); // Re-fetch data when the component is loaded

  return (
    <div className="All">
      <HomeWrapper>
        <Header navTo={"/home"} headerText={"커뮤니티"} />
        <Write src={writeImg} onClick={() => navigate("/write")} />
        <Wrap>
          <Text>함께하는 유사과학 이야기</Text>
          <CardWrap>
            {fetchedData.map((data, index) => (
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
            ))}
          </CardWrap>
        </Wrap>
        <Footer where={1} />
      </HomeWrapper>
    </div>
  );
};

export default Community;
