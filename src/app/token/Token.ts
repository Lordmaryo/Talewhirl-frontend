// TODO - handle token 

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem("token") as string;
}
