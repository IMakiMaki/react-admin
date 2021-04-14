import { Key } from 'react';
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

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

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
    localStorage.setItem(type, storageData);
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
  get token() {
    return this.getLocalStorage('token');
  }
}

export default Storage.getSingletonInstance<Storage>();
