// props for page response
import FeedbackComment from "../components/FeedbackComment";
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

export interface FeedbackComment {
  commentId: number;
  comment: string;
  createdBy: number;
  createdDate: string;
  likes: number;
  ownComment: boolean;
}

export interface FeedbackCommentResponseProps {
  content: FeedbackComment[];
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
