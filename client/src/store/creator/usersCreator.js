import { USER_API } from '@/services';

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
export const logout = async dispatch => {
  try {
    dispatch({ type: logoutRequest });
    await USER_API.getLogout();
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
export const auth = async dispatch => {
  try {
    dispatch({ type: authRequest });
    const data = await USER_API.getAuth();
    dispatch({ type: authSuccess, payload: data });
  } catch (e) {
    dispatch({ type: authFailure, payload: e.message });
  }
};