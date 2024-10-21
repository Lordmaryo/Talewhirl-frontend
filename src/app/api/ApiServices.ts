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


// props for page response 
export interface Book {
    id: number;
    title: string;
    authorName: string;
    genres: string | null; // this should be an array
    isbn: string;
    readCount: number;
    synopsis: string | null;
    owner: string;
    chapters: Chapter[];
    cover: string | null;
    backgroundCover: string | null;
    numOfChapters: number;
    rate: number;
    archived: boolean;
    sharable: boolean;
}

export interface Chapter {
    id: number;
    chapterName: string;
    epigraph: string;
    chapterNum: number;
    content: string;
    likes: any[];
    comments: any[];
}

export interface ResponseProps {
    content: Book[];
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}
