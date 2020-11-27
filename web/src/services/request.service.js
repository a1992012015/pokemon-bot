import axios from 'axios';
import { fromJS } from 'immutable';

import { environment } from '../environments';

export default class RequestService {
  defaultRequest = axios.create({
    baseURL: environment.mallApi
  });

  constructor() {
    // 添加请求拦截器
    this.defaultRequest.interceptors.request.use((config) => {
      // 在发送请求之前做些什么
      return config;
    }, (error) => {
      // 对请求错误做些什么
      return Promise.reject(fromJS(error || {}));
    });

    // 添加响应拦截器
    this.defaultRequest.interceptors.response.use((response) => {
      // 对响应数据做点什么
      return fromJS(response.data || {});
    }, (error) => {
      // 对响应错误做点什么
      return Promise.reject(fromJS(error || {}));
    });
  }
}