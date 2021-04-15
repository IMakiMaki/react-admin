import { storageUtil } from './storage';

export const doesUserHaveJWT = () => {
  return storageUtil.getToken() !== null;
};
