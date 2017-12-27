import axios from 'axios';
import httpInterceptor from './httpInterceptor';

const httpClient = axios.create({
  baseURL: '../api',
  timeout: 10000
});

const interceptor = httpClient.interceptors;

const setupInterceptors = () => {
  httpInterceptor(interceptor);
};

setupInterceptors();

export default httpClient;
