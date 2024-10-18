/**
 * 
 * @param token 
 * this file handles token activities from seting token when the user is logged in
 * to logging out a user
 */

export interface TokenDataProps {
    firstName: string,
    lastName: string,
    country: string,
    fullName: string
    id: number,
    email: number,
    iat: number,
    exp: number,
}

export const setToken = (token: string) => {
    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict; max-age=${oneWeekInSeconds}`;
}

export const getToken = (): string | null => {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    if (match) return match[2];
    return null;
}

export const removeToken = () => {
    document.cookie = `token=; path=/; max-age=0`;
    location.reload();
}

export interface TokenDataProps {
    firstName: string,
    lastName: string,
    country: string,
    fullName: string
    id: number,
    email: number,
    iat: number,
    exp: number,
}