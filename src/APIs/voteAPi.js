import axios from "axios";
import { BASE_URL } from "./APIconfig";

//vote 전체 조회
export const getVotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/votes`);
    console.log("votes 전체 조회 성공", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("vote 전체 조회 에러 : ", error);
  }
};

//투표 사항 생성
export const makeVote = async (title, regDate, elements, category) => {
  try {
    await axios.post(
      `${BASE_URL}/votes`,
      {
        title,
        regDate,
        elements,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("투표 생성 성공");
  } catch (error) {
    console.log("투표 생성 에러 : ", error);
  }
};

//투표하기
export const giveVote = async (voteId, voteElementId) => {
  try {
    await axios.post(
      `${BASE_URL}/votes/do`,
      {
        voteId,
        voteElementId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("투표하기 성공");
  } catch (error) {
    console.log("투표하기 에러 : ", error);
  }
};

//투표하기
export const addComment = async (voteId, text, regDate) => {
  try {
    await axios.patch(
      `${BASE_URL}/votes/reply`,
      {
        voteId,
        text,
        regDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("댓글 등록 성공");
  } catch (error) {
    console.log("댓글 등록 에러 : ", error);
  }
};

// vote_id로 조회
export const getComments = async (voteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/votes/${voteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("vote_id로 조회 성공", response.data.data);
  } catch (error) {
    console.log("댓글 등록 에러 : ", error);
  }
};

// 특정 투표에서 어디 투표했는지 가져오기
export const getWhereIsMyVote = async (voteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/votes/where/${voteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("내가 투표한 곳 조회 성공", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("댓글 등록 에러 : ", error);
  }
};

//내가 올린 항목 리스트 조회
export const getMyVotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/votes/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("내가 만든 리스트 조회 성공", response.data.data);
  } catch (error) {
    console.log("댓글 등록 에러 : ", error);
  }
};
