import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const instance = axios.create({
  baseURL: BACKEND_URL,
});

instance.interceptors.request.use(async config => {
  return config;
});
