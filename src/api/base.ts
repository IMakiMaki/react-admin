import { ServiceConstructorConfig } from '@/types/service';
import { Singleton } from '@/util/singleton';
import { storageUtil } from '@/util/storage';
import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { DtoSuccessResponse } from './dto/common.dto';
export class RequestBase extends Singleton {
  // create an axios instance
  private readonly baseURL = process.env.REACT_APP_API_BASE_URL;
  private reqBase;

  protected constructor(config: ServiceConstructorConfig) {
    super();
    this.reqBase = axios.create({
      baseURL: this.baseURL + config.prefix, // url = base url + request url
      timeout: config.timeout || 9999999, // request timeout
    });
    // request interceptor
    this.reqBase.interceptors.request.use(
      (config) => {
        const token = storageUtil.getToken();
        if (token) {
          config.headers['token'] = `${token}`;
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
        if (res.code && res.code !== '2000') {
          // 登录超时
          if (res.code === '4001') {
            console.error('登陆error');
            // haveWarnedLoginExpired = true;
            // // 重新登录
            // MessageBox.confirm('登录超时，请重新登录', '', {
            //   confirmButtonText: '重新登录',
            //   cancelButtonText: '取消',
            //   type: 'warning',
            // })
            //   .then(() => {
            //     clearStorage();
            //     location.reload();
            //     // console.log('重新登录');
            //   })
            //   .catch(() => {
            //     haveWarnedLoginExpired = false;
            //   });
          }

          // Message({
          //   message: res.message || 'Error',
          //   type: 'error',
          //   duration: 5 * 1000,
          //   showClose: true,
          // });
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
  // 封装一层的原因主要是为了减少包裹 DtoSuccessResponse 的样本代码
  request<T = any, R = DtoSuccessResponse<T>>(params: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      this.reqBase
        .request(params)
        .then((res) => {
          resolve((res as unknown) as R);
        })
        .catch((err) => {
          console.log(typeof err.message);
          if (typeof err.message === 'string') {
            message.error(err.message);
          }
          reject(err);
        });
    });
  }
}
