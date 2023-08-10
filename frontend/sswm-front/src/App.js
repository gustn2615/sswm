import "./App.css";
import "./index.css";
import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignUpName from "./pages/SignUpName";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import EditInfo from "./pages/EditInfo";
import StudyRoom from "./pages/StudyRoom";
import CreateStudyRoom from "./pages/CreateStudyRoom";
import StudyRoomAdmin from "./pages/StudyRoomAdmin";
import StudyRoomMember from "./pages/StudyRoomMember";
import LiveRoom from "./pages/LiveRoom";
import Stretching from "./pages/Stretching";
import KakaoSignCallback from "./shared/KakaoSignCallback";
import KakaoLoginCallback from "./shared/KakaoLoginCallback";


//import VideoRoomComponent from './components/OpenVidu/VideoRoomComponent';

function App() {
  const [isTokenValid, setIsTokenValid] = useState(true);

  const checkTokenValidity = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

    // 로그인 안했을 때
    if (accessToken === null) {
      setIsTokenValid(accessToken);
      console.log("여기로안옴?");
      return;
    }

    axios
      .post("/api/auth/access-token", accessToken, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("Access 토큰 유효: ", response.data);
        setIsTokenValid(accessToken);
      })
      .catch((error) => {
        // 로그인 했지만 access 토큰 만료 재발급 필요
        console.error("Access 토큰 만료: ", error);
        axios
          .post("/api/auth/refresh-access-token", refreshToken, {
            headers: {
              Authorization: refreshToken,
            },
          })
          .then((response) => {
            console.log("refresh토큰을 이용해 토큰 재발급: ", response.data);
            localStorage.setItem(
              "accessToken",
              JSON.stringify(response.data.accessToken)
            );
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(response.data.refreshToken)
            );
            setIsTokenValid(accessToken);

          })
          .catch((error) => {
            console.error("refresh 토큰 만료 :", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          });
      });
  };

  useEffect(() => {
    // 컴포넌트가 마운트된 후, 처음 한 번 유효성 확인
    checkTokenValidity();

    // 일정 간격(예: 1분)으로 토큰 유효성 확인
    const intervalId = setInterval(checkTokenValidity, 60000);

    // 언마운트 시 인터벌 클리어
    return () => clearInterval(intervalId);
  }, [isTokenValid]);

  return (
    <ContentWrap>
      <BrowserRouter>
        <Routes>
          <Route path="/kakao/sign" element={<KakaoSignCallback />} />
          <Route path="/kakao/login" element={<KakaoLoginCallback />} />
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/StudyRoom"
            element={isTokenValid ? <StudyRoom /> : <Login />}
          ></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/SignUpName" element={<SignUpName />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route
            path="/MyPage"
            element={isTokenValid ? <MyPage /> : <Login />}
          ></Route>
          <Route
            path="/EditInfo"
            element={isTokenValid ? <EditInfo /> : <Login />}
          ></Route>
          <Route path="/CreateStudyRoom" element={isTokenValid ? <CreateStudyRoom /> : <Login />}></Route>
          {/* 아래 Admin은 방장일 때만 접속가능하게 하나 만들어줘야할듯? */}
          <Route path="/StudyRoomAdmin/:studyroomId" element={isTokenValid ? <StudyRoomAdmin /> : <Login />}></Route>
          <Route path="/StudyRoomMember/:studyroomId" element={isTokenValid ? <StudyRoomMember /> : <Login />}></Route>
          <Route path="/LiveRoom/:studyroomId" element={isTokenValid ? <LiveRoom /> : <Login />}></Route>
          <Route path="/Stretching" element={isTokenValid ? <Stretching /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>
    </ContentWrap>
  );
}

export default App;

const ContentWrap = styled.div`
  min-height: 100%;
  margin: 0px;
  padding: 0px;
`;
