
import styled from "styled-components";
import KakaoLogo from "../assets/kakao_login_large_narrow.png";

const KakaoSign = ({REST_API_KEY, REDIRECT_URI}) => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const siginIn = () =>{
    window.location.href=(`${kakaoURL}`);
    console.log("SignIn")
  };
  

  return(
    <LogoImg
    src={KakaoLogo}
    alt="Kakao 회원가입"
    style={{ cursor: "pointer" }}
    onClick={() => siginIn()}
  />
  )
}

export default KakaoSign;

const LogoImg = styled.img`
width: 300px;
height: 65px;
`;