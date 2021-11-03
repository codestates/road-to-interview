import { USER_API } from '@/services';

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

// * Action Creator
// 로그인 요청
export const login = data => async dispatch => {
  try {
    dispatch({ type: loginRequest });
    const res = await USER_API.postLogin(data);
    dispatch({ type: loginSuccess, payload: res });
  } catch (e) {
    dispatch({ type: loginFailure, payload: e.response?.data?.message });
  }
};
// 구글 로그인 요청
export const googleLogin = data => async dispatch => {
  try {
    dispatch({ type: googleLoginRequest });
    const res = await USER_API.postOauth(data);
    dispatch({ type: googleLoginSuccess, payload: res });
  } catch (e) {
    dispatch({ type: googleLoginFailure, payload: e.response?.data?.message });
  }
};
// 카카오 로그인 요청
export const kakaoLogin = data => async dispatch => {
  try {
    dispatch({ type: kakaoLoginRequest });
    const res = await USER_API.postOauth(data);
    dispatch({ type: kakaoLoginSuccess, payload: res });
  } catch (e) {
    dispatch({ type: kakaoLoginFailure, payload: e.response?.data?.message });
  }
};
// 로그아웃 요청
export const logout = accessToken => async dispatch => {
  try {
    dispatch({ type: logoutRequest });
    await USER_API.getLogout(accessToken);
    dispatch({ type: logoutSuccess });
  } catch (e) {
    dispatch({ type: logoutFailure, payload: e.response?.data?.message });
  }
};
// 회원가입 요청
export const signup = data => async dispatch => {
  try {
    dispatch({ type: signupRequest });
    const res = await USER_API.postSignup(data);
    dispatch({ type: signupSuccess, payload: res });
  } catch (e) {
    dispatch({ type: signupFailure, payload: e.response?.data?.message });
  }
};
// 권한인증 요청
export const auth = accessToken => async dispatch => {
  try {
    dispatch({ type: authRequest });
    const data = await USER_API.getAuth(accessToken);
    dispatch({ type: authSuccess, payload: data });
  } catch (e) {
    dispatch({ type: authFailure, payload: e.response?.data?.message });
  }
};
// 유저정보 수정 요청
export const edit = data => async dispatch => {
  const { accessToken, payload } = data;
  try {
    dispatch({ type: editRequest });
    const data = await USER_API.putUserInfo(accessToken, payload);
    dispatch({ type: editSuccess, payload: data });
  } catch (e) {
    dispatch({ type: editFailure, payload: e.response?.data?.message });
  }
};
