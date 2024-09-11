import { createContext } from "react";

const IsLoginContext = createContext({
  isLogin: false,
  userInfo: {
    BasicInfoData: {
      username: "",
      email: "",
      tel: "",
    },
    UserDetailsData: {
      gender: "",
      birthdate: "",
    },
    CategoryData: [],
    PublisherData: [],
  },
  login: () => {},
  logout: () => {},
  updateUserInfo: () => {},
});

export default IsLoginContext;
