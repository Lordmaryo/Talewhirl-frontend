// props for page response 
export interface Book {
    id: number;
    title: string;
    authorName: string;
    genres: string[] | null; 
    isbn: string;
    pgRating: number;
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
