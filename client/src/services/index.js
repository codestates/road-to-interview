import axios from 'axios';
import Interview from './Interview';

import store from '@/store';
import User from './User';

const { accessToken } = store.getState().users;
const dispatch = store.dispatch;

const instance = axios.create({
  baseURL: 'https://sjitygfree.ga',
  withCredentials: true,
  headers: {
    Authorization: `${accessToken}`,
    'Content-Type': 'application/json',
  },
});
// * 요청 인터셉터 추가
// instance.interceptors.request.use(
//   function (config) {
//     // 요청을 보내기 전에 수행할 일
//     // ...
//     return config;
//   },
//   function (error) {
//     // 오류 요청을 보내기전 수행할 일
//     // ...
//     return Promise.reject(error);
//   },
// );

// * 응답 인터셉터 추가
// instance.interceptors.response.use(
//   function (response) {
//     // 응답 데이터를 가공
//     // ...
//     return response;
//   },
//   function (error) {
//     // 오류 응답을 처리
//     // ...
//     return Promise.reject(error);
//   },
// );

export const USER_API = new User(instance);
export const INTERVIEW_API = new Interview(instance);
