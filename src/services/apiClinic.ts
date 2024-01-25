import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';
import { signOutLegalPerson } from '@/contexts/authContext';

export function setupAPIClientClinic(ctx = undefined){
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies['@dentalsupportclinic.token']}`,
    },
  });

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if(error.response?.status === 401){
      if(typeof window !== undefined){
        signOutLegalPerson();
      }else{
        return Promise.reject(new AuthTokenError());
      };
    };

    return Promise.reject(error);
  });

  return api;
};