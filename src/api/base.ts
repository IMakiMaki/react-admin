import axios from "axios";
import { getToken } from "../util";

// create an axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // url = base url + request url
  // timeout: 10000, // request timeout
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const url = response.config.url;
    const res = response.data;
    console.group(`%c[${url}]`, "color:green;");
    console.log(res);
    console.groupEnd();
    // 服务端错误
    if (res.statusCode && res.errorResponse) {
      // 登录超时
      if (res.statusCode === "401") {
        // 重新登录
        console.error("登陆超时");
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("[响应错误]", error); // for debug
    return Promise.reject(error);
  }
);

export default instance;
