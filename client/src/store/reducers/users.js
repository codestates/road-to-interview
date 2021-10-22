import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  authRequest,
  authSuccess,
  authFailure,
} from '../actions/usersAction';

import { USER_API } from '@/services';

const initialState = {
  // 유저 정보
  userInfo: null,
  // 엑세스 토큰
  accessToken: null,
  // 로그인 요청
  loginLoading: false,
  loginDone: false,
  loginError: null,
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
};

// * Action Creator

// 로그인 요청
export const login = data => async dispatch => {
  try {
    dispatch({ type: loginRequest });
    const res = await USER_API.postLogin(data);
    dispatch({ type: loginSuccess, payload: res });
  } catch (e) {
    dispatch({ type: loginFailure, payload: e.message });
  }
};
// 로그아웃 요청
export const logout = accessToken => async dispatch => {
  try {
    dispatch({ type: logoutRequest });
    await USER_API.getLogout(accessToken);
    dispatch({ type: logoutSuccess });
  } catch (e) {
    dispatch({ type: logoutFailure, payload: e.message });
  }
};
// 회원가입 요청
export const signup = data => async dispatch => {
  try {
    dispatch({ type: signupRequest });
    const res = await USER_API.postSignup(data);
    dispatch({ type: signupSuccess, payload: res });
  } catch (e) {
    dispatch({ type: signupFailure, payload: e.message });
  }
};
// 권한인증 요청
export const auth =
  (accessToken = '') =>
  async dispatch => {
    try {
      dispatch({ type: authRequest });
      const data = await USER_API.getAuth(accessToken);
      dispatch({ type: authSuccess, payload: data });
    } catch (e) {
      dispatch({ type: authFailure, payload: e.message });
    }
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
    default:
      return state;
  }
}
