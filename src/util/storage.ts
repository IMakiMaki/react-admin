import { UnionToIntersection } from '@/types/common';
import { Singleton } from './singleton';

const PREFIX = 'REACT_ADMIN_';

interface DATA_TYPE {
  token: string;
  userInfo: Record<string, unknown>;
  permissions: Record<string, unknown>;
}

type D2P<T extends { [key: string]: any }> = {
  [Key in keyof T]: { type: Key; payload: T[Key] };
}[keyof T];

type setP<T> = T extends { type: infer X; payload: infer Y } ? (type: X, value: Y) => void : never;

type SetF = UnionToIntersection<setP<D2P<DATA_TYPE>>>;

const STORAGE_KEY_MAP = new Map<keyof DATA_TYPE, string>([
  ['token', `${PREFIX}TOKEN`],
  ['userInfo', `${PREFIX}USER_INFO`],
  ['permissions', `${PREFIX}PERMISSIONS`],
]);

class Storage extends Singleton {
  private setLocalStorage: SetF = <T extends keyof DATA_TYPE>(type: T, value: DATA_TYPE[T]) => {
    let storageData;
    try {
      storageData = JSON.stringify(value);
    } catch {
      const _data = String(value);
      storageData = _data;
    }
    localStorage.setItem(STORAGE_KEY_MAP.get(type)!, storageData);
  };
  private getLocalStorage<T extends keyof DATA_TYPE>(key: T): DATA_TYPE[T] | null {
    let storageData;
    if (!localStorage.getItem(key)) {
      return null;
    }
    try {
      storageData = JSON.parse(localStorage.getItem(key)!);
    } catch {
      storageData = localStorage.getItem(key);
    }
    return (storageData as unknown) as DATA_TYPE[T];
  }
  getToken() {
    return this.getLocalStorage('token');
  }
  setToken(token: string) {
    this.setLocalStorage('token', token);
  }
}

export const storageUtil = Storage.getSingletonInstance<Storage>();
