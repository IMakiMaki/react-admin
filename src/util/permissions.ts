import { getToken } from ".";

export const doesUserHaveJWT = () => {
  return getToken() !== null;
};
