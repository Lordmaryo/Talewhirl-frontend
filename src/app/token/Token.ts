/**
 *
 * @param token
 * this file handles token activities from setting token when the user is logged in
 * to logging out a user
 */

import { jwtDecode } from "jwt-decode";

export interface TokenDataProps {
  firstName: string;
  lastName: string;
  country: string;
  fullName: string;
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const setToken = (token: string) => {
  // const oneWeekInSeconds = 7 * 24 * 60 * 60;
  // document.cookie = `token=${token}; path=/; SameSite=Strict; max-age=${oneWeekInSeconds}`;
  window.localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  // const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  // if (match) return match[2];
  // return null;
  return window.localStorage.getItem("token");
};

export const removeToken = () => {
  // document.cookie = `token=; path=/; max-age=0`;
  window.localStorage.removeItem("token");
  location.reload();
};

// checks if user is authenticated and set token
const checkAuthAndSetToken = (
  getToken: () => string | null,
  setIsAuthenticated: (value: boolean) => void,
  setTokenData: (data: TokenDataProps) => void
): void => {
  const token = getToken();
  if (token) {
    setIsAuthenticated(true);
    const decodedToken = jwtDecode<TokenDataProps>(token);
    setTokenData(decodedToken);
  } else {
    setIsAuthenticated(false);
  }
};

// checks only if user is authenticated
export const checkAuthenication = (
  setIsAuthenticated: (value: boolean) => void
): void => {
  const token = getToken();
  if (token) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
};

export default checkAuthAndSetToken;
