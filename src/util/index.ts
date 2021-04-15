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
  function clone(val: any): any {
    let _data: any;
    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        _data = [];
        for (let index = 0; index < val.length; index++) {
          _data.push(clone(val[index]));
        }
      } else {
        _data = {};
        for (let key of val) {
          _data[key] = clone(val[key]);
        }
      }
    } else {
      _data = val;
    }
    return _data;
  }
  return clone(data);
};
