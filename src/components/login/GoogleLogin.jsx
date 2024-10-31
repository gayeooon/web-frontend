const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const REDIRECT_URI = "http://localhost:5173/member/oauth/google";
const REDIRECT_URI = "https://www.newsfit.shop/member/oauth/google";
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}.apps.googleusercontent.com&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email`;

export const handleGoogleClick = () => {
  window.location.href = GOOGLE_AUTH_URL;
};

const GoogleLogin = () => {};
