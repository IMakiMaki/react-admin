import { Fn } from '@/types/common';
import { RouteComponent } from '@/types/route';

const PREFIX = 'REACT_ADMIN';
const TOKEN_KEY = `${PREFIX}_TOKEN`;

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// 判断是否为React.lazy加载的组件
export const isReactLazyComponent = (component: RouteComponent) => {
  return Object.keys(component).some((key) => key === '$$typeof');
};

// 防抖
export const debounce = <T extends Fn>(delay: number, callback: T) => {
  let timer: number | null = null;
  if (typeof delay !== 'number') {
    callback = delay;
    delay = 1000;
  }
  return (...args: any[]) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
