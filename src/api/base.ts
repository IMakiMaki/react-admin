import { ServiceConstructorConfig } from '@/types/service';
import { Singleton } from '@/util/singleton';
import axios from 'axios';
import { getToken } from '../util';
export class RequestBase extends Singleton {
  // create an axios instance
  private readonly baseURL = process.env.REACT_APP_API_BASE_URL;
  protected reqBase;

  protected constructor(config: ServiceConstructorConfig) {
    super();
    this.reqBase = axios.create({
      baseURL: this.baseURL + config.prefix, // url = base url + request url
      timeout: config.timeout || 9999999, // request timeout
    });
    // request interceptor
    this.reqBase.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
      }
    );

    // response interceptor
    this.reqBase.interceptors.response.use(
      (response) => {
        const url = response.config.url;
        const res = response.data;
        console.group(`%c[${url}]`, 'color:green;');
        console.log(res);
        console.groupEnd();
        // 服务端错误
        if (res.statusCode && res.errorResponse) {
          // 登录超时
          if (res.statusCode === '401') {
            // 重新登录
            console.error('登陆超时');
          }
          return Promise.reject(new Error(res.message || 'Error'));
        } else {
          return res;
        }
      },
      (error) => {
        console.log('[响应错误]', error); // for debug
        return Promise.reject(error);
      }
    );
  }
}
