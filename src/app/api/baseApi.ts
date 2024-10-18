import axios from "axios";
import { getToken } from "../token/Token";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/api/v1",
});

// Inject the JWT token using an HTTP interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers.Authorization)
    }
    return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
        console.error(error.response);
    }
    return Promise.reject(error);
});

export default axiosInstance;
