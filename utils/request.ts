import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError, Method } from 'axios';

/* eslint-disable */
export const isAxiosResponse = (response: AxiosResponse<any> | AxiosError<any>): response is AxiosResponse => {
  return (response as AxiosResponse).status !== undefined;
}

export const isAxiosError = (response: AxiosResponse<any> | AxiosError<any>): response is AxiosError => {
  return (response as AxiosError).isAxiosError !== undefined;
}

export const serverRequest = async (
  method: Method,
  url: string,
  isHeader: boolean,
  data: any = {},
  params: any = {}
  ): Promise<AxiosResponse<any> | AxiosError<any>> => {
  let headers = {};
  if (isHeader) {
    if (localStorage.token) {
      headers = {
        'Content-Type': 'application/json',
        // Authorization: `token ${localStorage.token}`,
      };
    } else {
      // headers = {
      //   'ngrok-skip-browser-warning': 'true',
      //   "access-control-request-headers": '*/*'
      // }
      // TODO: check if auth fails
    }
  }
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    headers,
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    // baseURL: 'http://127.0.0.1:8000/api',
  }

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error as any;
  }
};