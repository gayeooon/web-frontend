import React, { useEffect } from "react";
import naver from "../assets/naver_logo_white.svg";
import { Button } from "@/components/ui/button";

const NaverLogin = () => {
  // API 사용 코드

  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const callbackUrl = "http://localhost:5173/";
  const state = "true";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${callbackUrl}`;

  const loginURL = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  // SDK 사용 코드

  //   const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  //   const callbackUrl = "http://localhost:5173/";

  //   const initializeNaverLogin = () => {
  //     const { naver } = window;
  //     const naverLogin = new naver.LoginWithNaverId({
  //       clientId,
  //       callbackUrl,
  //       isPopup: true,
  //       loginButton: { color: "green", type: 1, height: "10" },
  //     });
  //     console.log(naverLogin);
  //     naverLogin.init();
  //   };
  //   useEffect(() => {
  //     initializeNaverLogin();
  //   }, []);

  return (
    <div id="naverIdLogin" className="h-14 w-full">
      <Button variant="naver" onClick={loginURL}>
        <img className="h-2/6" src={naver} alt="naver_icon" />
        <span>네이버 로그인</span>
      </Button>
    </div>
    // <div id="naverIdLogin"></div>
  );
};

export default NaverLogin;
