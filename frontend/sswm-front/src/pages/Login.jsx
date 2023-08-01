import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from "../shared/kakaoApi";

import Gnb from "../components/Gnb";

import GoogleLogo from '../assets/Google_Logo.svg';
import KakaoLogo from '../assets/Kakao_Logo.svg';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';


// 로그인
import GoogleLogin from "../shared/GoogleLogin";
import Axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import KakaoLogin from "../shared/KakaoLogin";
import KakaoCallback from "../shared/KakaoCallback";
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),

  },
};

const Login = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    let res = await Axios.get("https://i9a206.p.ssafy.io/api/users", config);
    console.log(res.data);
    setUser(res.data);
  };

  const kakaoAuth = () => {
    window.location.href = KAKAO_AUTH_URL; // page redirect
  }
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <Box component="span" sx={{ p: 2, border: '1px solid grey' }}>
          <LoginWrap>
            <Text> 간편로그인 </Text>
            <SocialWrap>
              <LogoImg src={GoogleLogo} />
              <GoogleOAuthProvider clientId="508793857526-hjnar37f3fdnjsopr7lv7dfgkf972p5h.apps.googleusercontent.com">
                <GoogleLogin />
              </GoogleOAuthProvider>
              <LogoImg onClick={kakaoAuth} src={KakaoLogo} />
              <KakaoLogin JS_KEY="7d0b480cb467b756260e2f69512b54f6"REST_API_KEY ="a8cdfb7c6e1ce33857c1ff4df66c348c" REDIRECT_URI="https://i9a206.p.ssafy.io"/>
              <KakaoCallback REST_API_KEY ="a8cdfb7c6e1ce33857c1ff4df66c348c" REDIRECT_URI="https://i9a206.p.ssafy.io"/>
              <button onClick={getUser}>유저정보 가져오기</button>
            </SocialWrap>
            <ButtonWrap>
              <Link to="/SignUp"><Button variant="outlined">회원가입</Button></Link>
              <Link to="/SignUpName"><Button variant="outlined">로그인</Button></Link>
            </ButtonWrap>
          </LoginWrap>
        </Box>
        {user && (
                <h1>
                  /user :{" "}
                  {user.id +
                    " " +
                    user.username +
                    " " +
                    user.password +
                    " " +
                    user.email +
                    " " +
                    user.provider +
                    " " +
                    user.providerId}
                </h1>
              )}
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const LoginWrap = styled.div`
  position: relative;
  width: 480px;
  height: 300px;
  background-color: #FFFFFF;
`
const SocialWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

const LogoImg = styled.img`
  width: 240px;
  height: 100px;
`

const Text = styled.p`
  font-family: "NanumSquareNeo";
  font-size : 32px;
  text-align : center;
`
const ButtonWrap = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

export default Login;