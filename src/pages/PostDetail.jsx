import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useLocation, useParams } from "react-router-dom";
import userImg from "../assets/icons/Vector-1.png";
import chatIcon from "../assets/icons/Vector.png";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import sendIcon from "../assets/images/send.png"; // send 아이콘

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 56px;
`;

const Wrap = styled.form`
  padding: 0px 16px;
`;

const InputWrap = styled.div`
  position: absolute;
  width: 354px;
  bottom: 56px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d0d7fb;
  display: flex;
  padding: 10px 14px;
  align-items: center;
  box-sizing: border-box;
`;

const SendButton = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Post = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div``;

const ProfileImg = styled.img`
  width: 33px;
  height: 33px;
  margin-right: 16px;
`;

const PostTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const Date = styled.h1`
  color: #737373;
  font-size: 12px;
  margin-top: 4px;
`;

const Category = styled.h1`
  font-size: 12px;
  color: #5752d9;
`;

const NickName = styled.h1`
  font-size: 12px;
`;

const UserWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const SelectWrap = styled.div`
  margin-top: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  border-bottom: 1px solid #e6e6e6;
`;

const Title = styled.h1`
  font-size: 16px;
  color: #2e2e2e;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ChatHead = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 12px;
`;

const ChatImg = styled.img`
  width: 17px;
  height: 17px;
`;

const CommentWrap = styled.div`
  overflow: auto;
`;

const PostDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const {
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
  } = location.state || {};

  const dummyComments = [
    {
      nickname: "짱구짱최고",
      date: "2024.10.17",
      comment: "엥 enfp는 진짜 사람이 아닌 거 같은데요ㅋㅋㅋㅋ",
    },
    {
      nickname: "망개떡최고",
      date: "2024.10.17",
      comment: "헐 그건 아니죠.. enfp가 사람이지ㅋㅋㅋㅋ",
    },
    {
      nickname: "팝콘먹는중",
      date: "2024.10.16",
      comment: "재밌네 ㅋㅋㅋ 투표 해봤음?",
    },
    {
      nickname: "초코우유좋아",
      date: "2024.10.16",
      comment: "estj가 ㄹㅇ임",
    },
    {
      nickname: "게임고수짱짱",
      date: "2024.10.15",
      comment: "이건 뭐임ㅋㅋㅋ enfp가 왜 사람이 아님? ㅋㅋ",
    },
  ];

  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`댓글 내용: ${comment}`);
    setComment(""); // 댓글 제출 후 입력란 비움
  };

  return (
    <div className="All">
      <HomeWrapper>
        <Header headerText={`글 상세보기`} navTo={"/community"} />
        <Wrap onSubmit={handleSubmit}>
          <Post>
            <Info>
              <UserWrap>
                <ProfileImg src={userImg} />
                <div>
                  <NickName>노루</NickName>
                  <Date>{date}</Date>
                </div>
              </UserWrap>
            </Info>
            <Category>{category}</Category>
          </Post>
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
          </SelectWrap>

          <ChatHead>
            <img src={chatIcon} style={{ width: "16px", marginRight: "4px" }} />
            댓글 {commentCnt}
          </ChatHead>

          <CommentWrap>
            {dummyComments.map((comment, idx) => {
              return (
                <Comments
                  key={idx}
                  nickname={comment.nickname}
                  date={comment.date}
                  comment={comment.comment}
                />
              );
            })}
          </CommentWrap>

          <InputWrap>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글 내용을 입력해주세요"
            />
            <SendButton
              src={sendIcon}
              onClick={handleSubmit} // send 버튼 클릭 시 제출
            />
          </InputWrap>
        </Wrap>
        <Footer where={1} />
      </HomeWrapper>
    </div>
  );
};

export default PostDetail;
