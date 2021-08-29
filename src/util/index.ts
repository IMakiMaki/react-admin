import { Fn } from '@/types/common';
import { RouteComponent } from '@/types/route';

const PREFIX = 'REACT_ADMIN';

const setLocalStorage = (key: string, data: unknown) => {
  let storageData;
  try {
    storageData = JSON.stringify(data);
  } catch {
    const _data = String(data);
    storageData = _data;
  }
  localStorage.setItem(key, storageData);
};

const getLocalStorage = (key: string) => {
  let storageData;
  if (!localStorage.getItem(key)) {
    return null;
  }
  try {
    storageData = JSON.parse(localStorage.getItem(key)!);
  } catch {
    storageData = localStorage.getItem(key);
  }
  return storageData;
};

const USER_INFO_KEY = `${PREFIX}_TOKEN`;

export const setUserInfo = (userInfo: Record<string, string>) => {
  setLocalStorage(USER_INFO_KEY, userInfo);
};

export const getUserInfo = () => {
  return getLocalStorage(USER_INFO_KEY);
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

/**
 * 深拷贝
 * @param data
 */
export const deepClone = <T extends unknown>(data: T): T => {
  function clone<S extends unknown>(_data: S): S {
    const type = typeof _data;
    if (type === 'object') {
      if (Array.isArray(_data)) {
        let temp: unknown[] = [];
        for (let index = 0; index < _data.length; index++) {
          temp = [...temp, clone(_data[index])];
        }
        return temp as S;
      } else {
        let temp = {};
        for (let key in _data) {
          temp = {
            ...temp,
            [key]: clone(_data[key]),
          };
        }
        return temp as S;
      }
    } else {
      return (_data as unknown) as S;
    }
  }
  return clone<T>(data);
};

/**
 * 阶乘
 * @param {number} num
 * @returns {number}
 */
export const factorial = (num: number): number => {
  function calc(_num: number): number {
    if (_num === 1) {
      return 1;
    } else {
      return _num * calc(_num - 1);
    }
  }
  return calc(num);
};

export const howManyTimes = (steps: number): number => {
  if (steps === 2) {
    return 2;
  }
  if (steps <= 1) {
    return 1;
  }
  return 2 * howManyTimes(steps - 2);
};
