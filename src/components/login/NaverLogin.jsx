import React, { useEffect } from "react";
import { Button } from "@/components/ui/shadcn/button";

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/member/oauth/naver";
// const REDIRECT_URI = "https://www.newsfit.shop/member/oauth/naver";
const STATE = "state";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

export const handleNaverClick = () => {
  window.location.href = NAVER_AUTH_URL;
};

export const NaverLogin = () => {
  return <div>네이버 로그인</div>;
};
