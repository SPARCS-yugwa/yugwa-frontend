import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #d0d7fb;
  border-radius: 8px;
  padding: 12px 14px;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Category = styled.h1`
  color: #5752d9;
  font-size: 12px;
  font-weight: 600;
`;

const Date = styled.h1`
  font-size: 12px;
  color: #b1bcf8;
`;

const SelectWrap = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 16px;
  color: #2e2e2e;
  font-weight: 600;
  margin-bottom: 8px;
`;

const VoteBtn = styled.button`
  width: 100%;
  background-color: #e9efff;
  color: #4f7eff;
  border-radius: 8px;
  border: none;
  height: 40px;
`;

const Select = styled.div`
  border-radius: 8px;
  border: 1px solid #d2d2d2;
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Select1 = styled.div`
  background-color: #dae1e6;
  border-radius: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  width: ${({ width }) => width}%;
`;

const Select2 = styled.div`
  background-color: #85a5ff;
  border-radius: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  width: ${({ width }) => width}%;
`;

const SelectText = styled.h1`
  font-size: 14px;
  color: "#737373";
  margin-left: 14px;
`;

const Percentage = styled.h1`
  color: #5752d9;
  position: absolute;
  right: 14px;
  font-size: 14px;
  font-weight: 400;
`;

const TalkCard = ({
  id,
  title,
  category,
  date,
  vote1,
  vote2,
  vote1Title,
  vote2Title,
  commentCnt,
}) => {
  // Calculate width percentages
  const totalVotes = vote1 + vote2;
  const vote1Width = (vote1 / totalVotes) * 100;
  const vote2Width = (vote2 / totalVotes) * 100;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() =>
        navigate(`/postDetail/${id}`, {
          state: {
            title,
            category,
            date,
            vote1,
            vote2,
            vote1Title,
            vote2Title,
            commentCnt,
            vote1Width,
            vote2Width,
            totalVotes,
          },
        })
      }
    >
      <TopBox>
        <Category>{category}</Category>
        <Date>{date}</Date>
      </TopBox>
      <SelectWrap>
        <Title>{title}</Title>

        <Select>
          <Select1 width={vote1Width}>
            <SelectText>{vote1Title}</SelectText>
          </Select1>
          <Percentage>{parseInt(vote1Width)}%</Percentage>
        </Select>
        <Select>
          <Select2 width={vote2Width}>
            <SelectText>{vote2Title}</SelectText>
            <Percentage>{parseInt(vote2Width)}%</Percentage>
          </Select2>
        </Select>
        <VoteBtn
          onClick={(e) => {
            e.stopPropagation();
            alert("clicked");
          }}
        >
          투표하기
        </VoteBtn>
      </SelectWrap>
    </Card>
  );
};

export default TalkCard;
