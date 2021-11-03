import {
  loginRequest,
  loginSuccess,
  loginFailure,
  googleLoginRequest,
  googleLoginSuccess,
  googleLoginFailure,
  kakaoLoginRequest,
  kakaoLoginSuccess,
  kakaoLoginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  authRequest,
  authSuccess,
  authFailure,
  editRequest,
  editSuccess,
  editFailure,
} from '../actions/usersAction';

const initialState = {
  // 유저 정보
  userInfo: null,
  // 엑세스 토큰
  accessToken: null,
  // 로그인 요청
  loginLoading: false,
  loginDone: false,
  loginError: null,
  // 소셜 로그인
  googleLoginLoading: false,
  googleLoginDone: false,
  googleLoginError: null,
  kakaoLoginLoading: false,
  kakaoLoginDone: false,
  kakaoLoginError: null,
  // 로그아웃 요청
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  // 회원가입 요청
  signupLoading: false,
  signupDone: false,
  signupError: null,
  // 권한인증 요청
  authLoading: false,
  authDone: false,
  authError: null,
  // 유저 정보수정 요청
  editLoading: false,
  editDone: false,
  editError: null,
};

// * Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case loginRequest:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case loginSuccess:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        loginLoading: false,
        loginDone: true,
        loginError: null,
      };
    case loginFailure:
      return {
        ...state,
        loginLoading: false,
        loginDone: false,
        loginError: action.payload,
      };

    case googleLoginRequest:
      return {
        ...state,
        googleLoginLoading: true,
        googleLoginDone: false,
        googleLoginError: null,
      };
    case googleLoginSuccess:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        googleLoginLoading: false,
        googleLoginDone: true,
        googleLoginError: null,
      };
    case googleLoginFailure:
      return {
        ...state,
        googleLoginLoading: false,
        googleLoginDone: false,
        googleLoginError: action.payload,
      };
    case kakaoLoginRequest:
      return {
        ...state,
        kakaoLoginLoading: true,
        kakaoLoginDone: false,
        kakaoLoginError: null,
      };
    case kakaoLoginSuccess:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        kakaoLoginLoading: false,
        kakaoLoginDone: true,
        kakaoLoginError: null,
      };
    case kakaoLoginFailure:
      return {
        ...state,
        kakaoLoginLoading: false,
        kakaoLoginDone: false,
        kakaoLoginError: action.payload,
      };
    case logoutRequest:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError: null,
      };
    case logoutSuccess:
      return {
        ...state,
        userInfo: null,
        accessToken: null,
        logoutLoading: false,
        logoutDone: true,
        logoutError: null,
      };
    case logoutFailure:
      return {
        ...state,
        logoutLoading: false,
        logoutDone: false,
        logoutError: action.payload,
      };
    case signupRequest:
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null,
      };
    case signupSuccess:
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
        signupError: null,
      };
    case signupFailure:
      return {
        ...state,
        signupLoading: false,
        signupDone: false,
        signupError: action.payload,
      };
    case authRequest:
      return {
        ...state,
        authLoading: true,
        authDone: false,
        authError: null,
      };
    case authSuccess:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        authLoading: false,
        authDone: true,
        authError: null,
      };
    case authFailure:
      return {
        ...state,
        userInfo: null,
        accessToken: null,
        authLoading: false,
        authDone: false,
        authError: action.payload,
      };
    case editRequest:
      return {
        ...state,
        editLoading: true,
        editDone: false,
        editError: null,
      };
    case editSuccess:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        editLoading: false,
        editDone: true,
        editError: null,
      };
    case editFailure:
      return {
        ...state,
        editLoading: false,
        editDone: false,
        editError: action.payload,
      };
    default:
      return state;
  }
}
