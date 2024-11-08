// props for page response
import { baseApi } from "./baseApi";

export interface Book {
  id: number;
  title: string;
  authorName: string;
  genres: string[];
  isbn: string;
  createdDate: string | Date;
  pgRating: number;
  readCount: number;
  createdBy: number;
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
  likes: UserResponse[];
  comments: UserResponse[];
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

export interface Feedback {
  note: number;
  comment: string;
  bookId?: number;
}

export interface FeedbackResponse {
  note: number;
  comment: string;
  ownFeedback?: boolean;
  createdBy: number;
}

export interface FeedbackResponseProps {
  content: FeedbackResponse[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface FeedbackDataProps {
  commentId: number;
  comment: string;
  createdBy: number;
  createdDate: string;
  likes: number;
  ownComment: boolean;
}

export interface FeedbackCommentResponseProps {
  content: FeedbackDataProps[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface UserResponse {
  // TODO - add more props whe new fields are added to the userResponse server
  id: number;
  firstname: string;
  lastname: string;
  createdDate: string;
  email: string;
  about: string;
  dateOfBirth: string;
  generatedUsername: string;
  profilePic: string;
  backgroundPic: string;
  username: string;
  followers: number[];
  following: number[];
  country: string;
  bio: string;
}

export interface SavedBookResponse {
  id: number;
  bookName: string;
  numOfChapters: number;
}

export const loadUser = async (
  userId: number | string | undefined,
  setUserData: (user: UserResponse) => void
): Promise<void> => {
  try {
    const { data } = await baseApi.get<UserResponse>(`user/${userId}`);
    setUserData(data);
  } catch (error) {
    console.error(error);
  }
};

export const loadDrafts = async (
  setBookResponse: (BookResponse: ResponseProps) => void
) => {
  try {
    const { data } = await baseApi.get<ResponseProps>("/book/owner/drafts");
    setBookResponse(data);
  } catch (error) {
    console.error("Error loading drafts", error);
  }
};

export const loadPublished = async (
  setBookResponse: (BookResponse: ResponseProps) => void
) => {
  try {
    const { data } = await baseApi.get<ResponseProps>("book/owner/published");
    setBookResponse(data);
  } catch (error) {
    console.error("Error loading drafts", error);
  }
};

export const loadTrendingWeekly = async (
  page: number,
  size: number,
  setBookResponse: (BookResponse: ResponseProps) => void
) => {
  try {
    const { data } = await baseApi.get(
      `book/trending_weekly?page=${page}&size=${size}`
    );
    setBookResponse(data);
  } catch (error) {
    console.error(error);
  }
};

export const loadTopTen = async (setTopTen: (topTen: Book[]) => void) => {
  try {
    const { data } = await baseApi.get(`book/top10`);
    setTopTen(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchBookById = async (
  bookId: string,
  setBook: (book: Book) => void
) => {
  try {
    const { data } = await baseApi.get(`book/${bookId}`);
    setBook(data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteBook = async (bookId: string | number) => {
  try {
    await baseApi.delete(`book/delete/${bookId}`);
    location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const publishBook = async (bookId: string | number) => {
  try {
    await baseApi.patch(`book/sharable/${bookId}`);
  } catch (error) {
    console.error("Failed to update sharable status", error);
  }
};
