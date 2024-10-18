//USELESS FOR NOW

import { axiosInstance } from "./baseApi";

interface FetchUserProps {
    userId: number;
    setData: (data: string) => void;
}

export const fetchUserData = async ({ userId, setData }: FetchUserProps) => {
    try {
        const response = await axiosInstance.get(`user/${userId}/fullname`);
        setData(response.data);
    } catch (err) {
        console.error(err);
    }
};
