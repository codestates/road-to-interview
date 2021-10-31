import axios from 'axios';
import Interview from './Interview';

import store from '@/store';
import { authRequest, authSuccess, authFailure } from '@/store/actions/usersAction';
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

export const USER_API = new User(instance);
export const INTERVIEW_API = new Interview(instance);
