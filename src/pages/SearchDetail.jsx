import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import calendar from "../assets/icons/ic_date.png";
import { getPaperDetail } from "../APIs/paperAPI";
import geminiSummary from "../components/geminiSummary";
import Spinner from "../components/Spinner";

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
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState({
    date: "",
    title: "",
    content: "",
  });

  //데이터 가져오는 로직 넣기
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPaperDetail(id);
      const result = await geminiSummary(response.summary);
      setSummary(result);
      setFetchedData(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (summary != undefined) setLoading(false);
  }, [summary]);

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
            {loading && <Spinner />}
            <Title>{fetchedData.title}</Title>
            <Content>{summary}</Content>
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
