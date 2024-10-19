import React from "react";
import userImg from "../assets/icons/Vector-1.png";
import styled from "styled-components";

const CommentWrap = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  width: 100%; /* 부모 요소의 전체 너비를 차지 */
  margin-bottom: 12px; /* 댓글 사이에 약간의 여백 추가 */
`;

const Profile = styled.img`
  width: 33px;
  height: 33px;
  margin-right: 14px;
`;

const Nickname = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-right: 10px;
  margin-bottom: 8px;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #737373;
`;

const Comment = styled.h1`
  font-size: 14px;
  color: black;
`;

const Comments = ({ nickname, date, comment }) => {
  return (
    <CommentWrap>
      <Profile src={userImg} />
      <div>
        <div>
          <Nickname>{nickname}</Nickname>
          <Date>{date}</Date>
        </div>
        <Comment>{comment}</Comment>
      </div>
    </CommentWrap>
  );
};

export default Comments;
