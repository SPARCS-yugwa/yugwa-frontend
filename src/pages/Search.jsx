import React, { useEffect, useState } from "react";
import {
  addSearchKeyword,
  deleteKeyword,
  getRecentSearchKeywords,
  keywordSearch,
} from "../APIs/api";
import { useRecoilValue } from "recoil";
import { geolocationState, userIdState } from "../store/atoms";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { faChevronLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import close from "../assets/close.png";
import close from "../assets/icons/close.png";
import { getPapers } from "../APIs/paperAPI";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
`;

const Chevron = styled.i`
  cursor: pointer;
  font-size: 15px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #85a5ff;
  padding-left: 4px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
`;

const SearchInput = styled.input`
  padding: 8px 10px;
  height: 37px;
  box-sizing: border-box;
  background-color: #f3f8ff;
  color: #91919c;
  font-size: 14px;
  border: none;

  &:first-child {
    flex: 1; /* 텍스트 입력 필드는 가변적인 너비 */
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    width: auto; /* 제출 버튼은 고정된 너비 */
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #85a5ff;
    color: #fff;
    cursor: pointer;
  }
`;

const TextWrap = styled.div`
  height: 21px;
  margin-bottom: 3px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GrayText = styled.span`
  color: #91919c;
  font-size: 14px;
`;

const WhiteText = styled.span`
  color: #1c1e1f;
  font-size: 14px;
  font-weight: 600;
`;

const RecentWrap = styled.div``;

const RecentUl = styled.ul``;

const RecentLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 33px;
`;

const KeywordUl = styled.ul``;

const KeywordLi = styled.li`
  font-size: 14px;
  /* background-color: #f6f8fa; */
  margin-bottom: 6px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #85a5ff;
  color: #1c1e1f;
  padding: 16px 12px;
  display: flex;
`;

const KeywordCount = styled.div`
  height: 21px;
  margin-bottom: 10px;
  display: flex;
  gap: 8px;
  display: flex;
  position: relative;
`;

const Nothing = styled.div`
  flex-direction: column;
  gap: 10px;
  display: flex;
  width: 100%;
  height: 40%;
  justify-content: center;
  align-items: center;
`;

const goSummary = styled.div`
  background-color: black;
  right: 10px;
  width: 100px;
`;

const RecentKeyword = styled.span``;

const RecentDelete = styled.i``;

const Search = () => {
  const [typedText, setTypedText] = useState("");
  const [keywordList, setKeywordList] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [searchedKeywords, setSearchedKeywords] = useState([]);
  const startLocation = useRecoilValue(geolocationState);
  const [endLatitude, setEndLatitude] = useState(0);
  const [endLongitude, setEndLongitude] = useState(0);
  const startLatitude = startLocation.latitude;
  const startLongitude = startLocation.longitude;
  const userId = useRecoilValue(userIdState);
  const navigate = useNavigate();

  // search페이지 렌더링시 최근 검색어 리스트 요청, searchedKeywords변수에 저장
  useEffect(() => {
    // const fetchKeywordList = async () => {
    //   const fetchedData = await getRecentSearchKeywords(userId);
    //   console.log(fetchedData);
    //   setSearchedKeywords(fetchedData.slice(0, 3) || []);
    // };

    // fetchKeywordList();
    setSearchedKeywords([
      { word: "mbti" },
      { word: "탈모" },
      { word: "알코올" },
    ]);
  }, [userId]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchKeywordList = async () => {
        if (typedText) {
          try {
            const response = await getPapers(typedText);
            console.log("API Response:", response);
            setKeywordList(response || []);
          } catch (error) {
            console.error(error);
            setKeywordList([]);
          }
        } else {
          setKeywordList([]);
        }
      };

      fetchKeywordList();
    }, 300); // 300ms 디바운스 -> api호출 횟수 줄임

    return () => clearTimeout(delayDebounceFn);
  }, [typedText]);

  // 폼 제출 후 상태 변경 시 콘솔 출력
  useEffect(() => {
    if (selectedPlace.place_name) {
      console.log("검색할 장소: ", selectedPlace);
      console.log("place latitude:", selectedPlace.y);
      console.log("place longitude:", selectedPlace.x);
      console.log("시작 위도 : ", startLatitude);
      console.log("시작 경도 : ", startLongitude);
      console.log("도착 위도 : ", endLatitude);
      console.log("도착 경도 : ", endLongitude);
    }
  }, [selectedPlace, endLatitude, endLongitude, startLatitude, startLongitude]);

  const handleInputChange = (event) => {
    setTypedText(event.target.value);
  };

  const placeClick = (name) => {
    setTypedText(name);
  };

  const handleKeywordClick = (clickedKeyword) => {
    setTypedText(clickedKeyword);
  };

  //폼 제출시 navigation페이지로 이동, 검색어 서버로 전송
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const place = keywordList.find((place) => place.place_name === typedText);
    if (place) {
      await addSearchKeyword(userId, place.place_name);
      console.log(place);
      setSelectedPlace(place);
      setEndLatitude(place.y);
      setEndLongitude(place.x);

      navigate("/navigation", {
        state: {
          startLatitude,
          startLongitude,
          endLatitude: parseFloat(place.y),
          endLongitude: parseFloat(place.x),
          typedText,
          destinationId: place.id,
        },
      });
    }
  };

  //최근 검색어 모두 삭제
  const deleteAllRecent = async () => {
    // 구현된 삭제 API 함수 호출
    await deleteKeyword(userId, 0);
    // 업데이트된 검색어 리스트 요청
    const updatedKeywords = await getRecentSearchKeywords(userId);
    setSearchedKeywords(updatedKeywords.slice(0, 3) || []);
  };

  //특정 검색어 삭제
  const deleteCertainRecent = async (searchId) => {
    // 특정 검색어 삭제 API 호출
    await deleteKeyword(userId, searchId);
    // 업데이트된 검색어 리스트 요청
    const updatedKeywords = await getRecentSearchKeywords(userId);
    setSearchedKeywords(updatedKeywords.slice(0, 3) || []);
  };

  return (
    <HomeWrapper className="All">
      <Wrap>
        <Chevron onClick={() => navigate("/home")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Chevron>
        <SearchForm onSubmit={handleFormSubmit}>
          <SearchInput
            type="text"
            placeholder="유사과학을 검색해보세요"
            onChange={handleInputChange}
            value={typedText}
          />
          <SearchInput type="submit" value="검색" />
        </SearchForm>
      </Wrap>

      {typedText !== "" ? (
        keywordList.length > 0 ? (
          <KeywordUl>
            <KeywordCount>
              <GrayText>검색 결과</GrayText>
              <WhiteText>{keywordList.length}</WhiteText>
            </KeywordCount>
            {keywordList.map((paper, index) => (
              <KeywordLi
                key={paper.id}
                // onClick={() => placeClick(place.place_name)}
              >
                <div style={{ width: "77%" }}>
                  {paper.title.length > 20
                    ? `${paper.title.substring(0, 20)}...`
                    : paper.title}
                </div>
                <div
                  style={{ width: "23%", color: "#5752d9", cursor: "pointer" }}
                  onClick={() => navigate(`/searchDetail/${paper.id}`)}
                >
                  AI 요약 보기
                </div>
              </KeywordLi>
            ))}
          </KeywordUl>
        ) : (
          <Nothing>
            <WhiteText style={{ fontSize: "20px" }}>
              검색 결과가 없습니다
            </WhiteText>
            <GrayText style={{ fontSize: "16px", color: "#797982" }}>
              다른 키워드로 검색해보세요
            </GrayText>
          </Nothing>
        )
      ) : (
        <RecentWrap>
          <TextWrap>
            <WhiteText style={{ fontSize: "16px" }}>
              현재 인기 있는 논문 키워드
            </WhiteText>
          </TextWrap>
          <RecentUl>
            {searchedKeywords.map((keyword, index) => (
              <RecentLi key={index}>
                <WhiteText
                  style={{ color: "#5752d9", cursor: "pointer" }}
                  onClick={() => {
                    handleKeywordClick(keyword.word);
                  }}
                >
                  {"\u00A0" + (index + 1) + ". " + keyword.word}
                </WhiteText>
              </RecentLi>
            ))}
          </RecentUl>
        </RecentWrap>
      )}
    </HomeWrapper>
  );
};

export default Search;
