import axios from "axios";
import { BASE_URL } from "./APIconfig";

const token = localStorage.getItem("accessToken");

//vote 전체 조회
export const getPapers = async (word) => {
  try {
    const response = await axios.get(`${BASE_URL}/papers/${word}`);
    console.log("논문 조회 성공", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("논문 조회 에러 : ", error);
  }
};

export const getPaperDetail = async (paperId) => {
  try {
    const response = await axios.get(`${BASE_URL}/papers/detail/${paperId}`);
    console.log("논문 디테일 성공 : ", response);
    return response.data.data;
  } catch (error) {
    console.log("논문 디테일 가져오기 에러 : ", error);
  }
};
