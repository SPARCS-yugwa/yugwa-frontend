import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWhereIsMyVote, giveVote } from "../APIs/voteAPi";

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

const NotSelect = styled.div`
  border-radius: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #4F7EFF" : "1px solid #d2d2d2"};
`;

const SelectText = styled.h1`
  font-size: 14px;
  min-width: 100px;
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
  vote1id,
  vote2id,
}) => {
  // Calculate width percentages
  const [currentVote1, setCurrentVote1] = useState(vote1);
  const [currentVote2, setCurrentVote2] = useState(vote2);
  const totalVotes = currentVote1 + currentVote2;
  const vote1Width = (currentVote1 / totalVotes) * 100 || 0;
  const vote2Width = (currentVote2 / totalVotes) * 100 || 0;

  const navigate = useNavigate();
  const [isVoted, setIsVoted] = useState(-1);
  const [selectedVoteId, setSelectedVoteId] = useState(null);

  useEffect(() => {
    const getIsVoted = async () => {
      const response = await getWhereIsMyVote(id);
      setIsVoted(response?.userId);
    };

    getIsVoted();
  }, [id]);

  // Extract only the date part (before 'T')
  const formattedDate = date.split("T")[0];

  const handleVote = async () => {
    // Call the API to submit the vote
    await giveVote(id, selectedVoteId);

    // Update the local state based on the selected vote
    if (selectedVoteId === vote1id) {
      setCurrentVote1((prevVote1) => prevVote1 + 1);
    } else if (selectedVoteId === vote2id) {
      setCurrentVote2((prevVote2) => prevVote2 + 1);
    }

    // After voting, set isVoted to show the result
    setIsVoted(0);
  };

  return (
    <Card>
      <TopBox>
        <Category>{category}</Category>
        <Date>{formattedDate}</Date>
      </TopBox>

      {/* 투표 안했을때 */}
      {isVoted == -1 && (
        <SelectWrap>
          <Title onClick={() => navigate(`/postDetail/${id}`)}>{title}</Title>

          <Select>
            <NotSelect
              isSelected={selectedVoteId === vote1id}
              onClick={() => setSelectedVoteId(vote1id)}
            >
              <SelectText>{vote1Title}</SelectText>
            </NotSelect>
          </Select>
          <Select>
            <NotSelect
              isSelected={selectedVoteId === vote2id}
              onClick={() => setSelectedVoteId(vote2id)}
            >
              <SelectText>{vote2Title}</SelectText>
            </NotSelect>
          </Select>

          <VoteBtn
            onClick={(e) => {
              e.stopPropagation();
              handleVote(); // Call the vote handler
            }}
            disabled={!selectedVoteId} // Disable the button until an option is selected
          >
            투표하기
          </VoteBtn>
        </SelectWrap>
      )}

      {/* 투표했을때 */}
      {isVoted != -1 && (
        <SelectWrap>
          <Title onClick={() => navigate(`/postDetail/${id}`)}>{title}</Title>

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
              alert("You have already voted.");
            }}
          >
            투표완료
          </VoteBtn>
        </SelectWrap>
      )}
    </Card>
  );
};

export default TalkCard;
