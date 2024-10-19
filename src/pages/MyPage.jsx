import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import a from "../assets/images/a.png";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userDataState } from "../store/atoms";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
`;

const UserWrap = styled.div`
  border-bottom: 3px solid #e6ebf9;
`;

const UserInfo = styled.div`
  padding: 20px 25px;
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Nickname = styled.h1`
  color: #26282b;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const GrayText = styled.h1`
  font-size: 14px;
  color: #9fa4a9;
  font-weight: 400;
`;

const SelectWrap = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const Select = styled.div`
  padding: 12px 14px;
  color: black;
  font-size: 14px;
  border-bottom: 1px solid #e6ebf9;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MyPage = () => {
  const userData = useRecoilValue(userDataState);
  return (
    <div className="All">
      <HomeWrapper>
        <Header navTo={""} headerText={"마이페이지"} />
        <UserWrap>
          <UserInfo>
            <Profile src={userData.imageUrl || ""} alt="Profile" />
            <div>
              <Nickname>{userData.nickname || "Guest"}</Nickname>{" "}
              {/* name 수정 */}
              <GrayText>
                초급 Lv.{parseInt(userData.expLevel / 100) + 1}
              </GrayText>{" "}
              {/* exp 수정 */}
            </div>
          </UserInfo>
        </UserWrap>

        <SelectWrap>
          <Select>
            찜한 논문 요약 리스트 보기
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#E6EBF9" }}
            />
          </Select>
          <Select>
            로그아웃
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#E6EBF9" }}
            />
          </Select>
        </SelectWrap>
        <Footer where={2} />
      </HomeWrapper>
    </div>
  );
};

export default MyPage;
