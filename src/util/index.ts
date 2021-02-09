const PREFIX = "REACT_ADMIN";
const TOKEN_KEY = `${PREFIX}_TOKEN`;

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
