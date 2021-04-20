import { DtoLoginSuccess } from '@/api/dto/user.dto';
import { UnionToIntersection } from '@/types/common';
import { Singleton } from './singleton';

const PREFIX = 'REACT_ADMIN_';
interface DATA_TYPE {
  token: string;
  userInfo: DtoLoginSuccess['user'];
  permissions: DtoLoginSuccess['permission'];
}

type SetName<T extends string> = `set${Capitalize<T>}`;
type GetName<T extends string> = `get${Capitalize<T>}`;

type MatchDataType<S extends string, T extends string> = S extends `${T}${infer X}`
  ? `${Uncapitalize<X>}`
  : never;

type SetFunc<T extends { [key: string]: any }> = {
  [Key in SetName<keyof T extends string ? keyof T : never>]: (
    data: T[MatchDataType<Key, 'set'>]
  ) => void;
};

type GetFunc<T extends { [key: string]: any }> = {
  [Key in GetName<keyof T extends string ? keyof T : never>]: () =>
    | T[MatchDataType<Key, 'get'>]
    | null;
};

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
class Storage extends Singleton implements SetFunc<DATA_TYPE>, GetFunc<DATA_TYPE> {
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
  setUserInfo() {}
  getUserInfo() {
    return this.getLocalStorage('userInfo');
  }
  setPermissions() {}
  getPermissions() {
    return this.getLocalStorage('permissions');
  }
  setToken(token: string) {
    this.setLocalStorage('token', token);
  }
  getToken() {
    return this.getLocalStorage('token');
  }
}

export const storageUtil = Storage.getSingletonInstance<Storage>();
