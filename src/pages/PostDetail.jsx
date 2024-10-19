import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useLocation, useParams } from "react-router-dom";
import userImg from "../assets/icons/Vector-1.png";
import chatIcon from "../assets/icons/Vector.png";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import sendIcon from "../assets/images/send.png"; // send 아이콘
import { addComment, getComments } from "../APIs/voteAPi";

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
  border-radius: 50%;
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
  min-width: 120px;
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
  min-width: 100px;
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
  const { commentCnt, totalVotes, vote1id, vote2id } = location.state || {};

  const [comments, setComments] = useState([]);
  const [fetchedData, setFetchedData] = useState();
  const [vote1Width, setVote1Width] = useState(0);
  const [vote2Width, setVote2Width] = useState(0);

  const getData = async () => {
    const response = await getComments(id);
    console.log(response);
    setFetchedData(response);
    setComments(response?.voteReplies || []);

    // 투표 퍼센티지 계산
    const totalCount = response?.totalCount || 0; // 전체 투표 수
    if (totalCount > 0) {
      const vote1Count = response.voteElements[0].count || 0;
      const vote2Count = response.voteElements[1].count || 0;

      // 투표 항목별 퍼센티지 계산
      setVote1Width((vote1Count / totalCount) * 100);
      setVote2Width((vote2Count / totalCount) * 100);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if comment is not empty
    if (comment.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      // Submit the comment first
      await addComment(id, comment, "2024-10-19T16:13:37.724");

      // After the comment is successfully added, fetch the updated data
      await getData();

      // Clear the comment input
      setComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className="All">
      <HomeWrapper>
        <Header headerText={`글 상세보기`} navTo={"/community"} />
        <Wrap onSubmit={handleSubmit}>
          <Post>
            <Info>
              <UserWrap>
                <ProfileImg src={fetchedData?.member?.profileImageUrl} />
                <div>
                  <NickName>{fetchedData?.member.nickname}</NickName>
                  <Date>{fetchedData?.regDate.split("T")[0]}</Date>
                </div>
              </UserWrap>
            </Info>
            <Category>{fetchedData?.category}</Category>
          </Post>
          <SelectWrap>
            <Title>{fetchedData?.title}</Title>

            <Select>
              <Select1 width={vote1Width}>
                <SelectText>{fetchedData?.voteElements[0].title}</SelectText>
              </Select1>
              <Percentage>{parseInt(vote1Width)}%</Percentage>
            </Select>
            <Select>
              <Select2 width={vote2Width}>
                <SelectText>{fetchedData?.voteElements[1].title}</SelectText>
              </Select2>
              <Percentage>{parseInt(vote2Width)}%</Percentage>
            </Select>
          </SelectWrap>

          <ChatHead>
            <img src={chatIcon} style={{ width: "16px", marginRight: "4px" }} />
            댓글 {commentCnt}
          </ChatHead>

          <CommentWrap>
            {fetchedData?.voteReplies.map((comment, idx) => {
              return (
                <Comments
                  key={idx}
                  nickname={comment?.member?.nickname}
                  date={comment?.regDate.split("T")[0]}
                  comment={comment?.text}
                  profile={comment?.member?.profileImageUrl}
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
