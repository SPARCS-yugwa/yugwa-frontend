import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import calendar from "../assets/icons/ic_date.png";
import { getPaperDetail } from "../APIs/paperAPI";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
`;

const Wrap = styled.div`
  padding: 20px;
  padding-top: 90px;
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

const CalendarWrap = styled.div`
  padding: 4px 11px;
  border-radius: 111px;
  display: flex;
  background-color: #bacdff;
  align-items: center;
`;

const Date = styled.h1`
  color: #5752d9;
  font-size: 14px;
  margin-left: 4px;
`;

const Calendar = styled.img`
  width: 24px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0px;
`;

const Content = styled.span`
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

const SearchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState({
    date: "2023.01.01",
    title: "mbti 상관관계",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi velit illo nam explicabo optio deserunt, officiis sapiente provident culpa fuga saepe accusantium dolore sequi dicta, totam dolor. Sint, nemo.",
  });

  //데이터 가져오는 로직 넣기
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPaperDetail(id);
      setFetchedData(response);
    };
    fetchData();
  }, []);
  return (
    <div className="All">
      <HomeWrapper>
        <Header headerText={"논문 설명"} navTo={"/search"} />
        <Wrap>
          <Card>
            <CalendarWrap>
              <Calendar src={calendar} />
              <Date>{fetchedData.year}</Date>
            </CalendarWrap>
            <Title>{fetchedData.title}</Title>
            <Content>{fetchedData.summary}</Content>
          </Card>
          <Btn
            onClick={() => {
              navigate(-1);
            }}
          >
            홈으로 돌아가기
          </Btn>
        </Wrap>
      </HomeWrapper>
    </div>
  );
};

export default SearchDetail;
