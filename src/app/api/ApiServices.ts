// props for page response
import baseApi from "./baseApi";

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

export interface UserResponse {
  // TODO - add more props whe new fields are added to the userResponse server
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  generatedUsername: string;
  username: string;
  followers: UserResponse[];
  following: UserResponse[];
  country: string;
  bio: string | null;
}

interface LoadUserProps {
  userId: number;
  setUserData: (user: UserResponse) => void;
}

export const loadUser = async ({
  userId,
  setUserData,
}: LoadUserProps) => {
  try {
    const { data } = await baseApi.get<UserResponse>(`user/${userId}`);
    setUserData(data);
  } catch (error) {
    console.error(error);
  }
};
