import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = (props) => {
  const navigate = useNavigate();

  // 인가 코드 가져오기
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    console.log("code: ", code);
    if (code) {
      // 백엔드로 GET 요청 보내기
      axios
        .get(`https://yugwa.site/api/members/kakao`, {
          params: { code: code },
        })
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data;

          // accessToken과 refreshToken을 로컬 스토리지에 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // 메인 페이지로 리다이렉트
          navigate("/home");
        })
        .catch((error) => {
          // 에러 발생 시 처리할 로직
          console.error("로그인 실패:", error);
          alert("로그인에 실패했습니다.");
        });
    }
  }, []);

  return null;
};

export default OAuth2RedirectHandler;
