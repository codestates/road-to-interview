import axios from 'axios';

import User from './User';

const instance = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const USER_API = new User(instance);
