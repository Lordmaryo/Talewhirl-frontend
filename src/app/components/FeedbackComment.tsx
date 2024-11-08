import React, { useEffect, useState } from "react";
import defaultProfile from "../image/default-profile.png";
import {
  FeedbackDataProps,
  FeedbackCommentResponseProps,
  loadUser,
  UserResponse,
} from "../api/ApiServices";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { baseApi } from "../api/baseApi";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import { timeAgo } from "../utilities/Helpers";
import { checkAuthenication } from "../token/Token";
import { toast } from "react-toastify";

interface FeedbackCommentProps {
  bookId: number;
} // showComment

const FeedbackComment = ({ bookId }: FeedbackCommentProps) => {
  const [comment, setComment] = useState("");
  const [feedbackResponse, setFeedbackResponse] =
    useState<FeedbackCommentResponseProps | null>(null);
  const [userData, setUserData] = useState<Record<number, UserResponse | null>>(
    {}
  );
  const [likeEvents, setLikeEvents] = useState<Record<number, boolean>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadFeedbackComments();
    checkAuthenication(setIsAuthenticated);
  }, [bookId]);

  const loadFeedbackComments = async () => {
    const page = 0;
    const size = 10;
    try {
      const { data } = await baseApi.get(
        `feedback_comments/book/${bookId}?page=${page}&size=${size}`
      );
      setFeedbackResponse(data);

      data.content.forEach((comment: FeedbackDataProps) => {
        loadUser(comment.createdBy, (user: UserResponse) => {
          setUserData((prevData) => ({
            ...prevData,
            [comment.createdBy]: user,
          }));
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("You need to have an account to complete this action");
    }
    try {
      await baseApi.post("feedback_comments/add_comment", {
        comment,
        bookId,
      });
      setComment("");
      loadFeedbackComments();
    } catch (error: any) {
      console.error(error.response?.data?.businessErrorDescription);
      console.error(error.response?.data?.validationErrors);
    }
  };

  const handleLike = async (commentId: number) => {
    try {
      const isLiked = likeEvents[commentId];
      await baseApi.post(
        `feedback_comments/${commentId}/${isLiked ? "unlike" : "like"}`
      );
      setLikeEvents((prev) => ({ ...prev, [commentId]: !isLiked }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lg:w-[700px] py-10">
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="w-full bg-[#272727] py-2 px-6 rounded-t-md">
                <div className="flex items-center gap-x-2">
                  <span className="font-bold">Comments</span>
                  <span>{feedbackResponse?.content.length}</span>
                </div>
                <div className="bg-[#313131] m-2 p-1 rounded-lg text-center hover:bg-[#393939] transition-colors">
                  Click to open feedbacks
                </div>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="bg-[#1d1c1c] px-5 rounded-b-md pb-5">
              <div className="py-4 flex gap-x-2">
                <Image
                  src={defaultProfile}
                  className="h-8 w-8 rounded-full"
                  alt="default-profile"
                />
                <form onSubmit={handleSubmit} className="w-full">
                  <input
                    type="text"
                    className="w-full outline-none border-b-2 border-zinc-500 bg-transparent pr-2"
                    placeholder="Add a feedback"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </form>
              </div>
              <div>
                <div>
                  {feedbackResponse?.content.map((c) => {
                    const user = userData[c.createdBy];
                    return (
                      <div
                        key={c.commentId}
                        className="flex flex-row gap-2 py-4 relative"
                      >
                        <Link href={`/profile/${c.createdBy}`}>
                          <Image
                            src={defaultProfile}
                            className="h-8 w-8 rounded-full"
                            alt="default-profile"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link
                            href={`/profile/${c.createdBy}`}
                            className="font-bold"
                          >
                            {user?.firstname || "Unknown User"}
                          </Link>
                          <button
                            onClick={() => handleLike(c.commentId)}
                            className="absolute top-2 right-2 hover:border-zinc-600 hover:border rounded-lg px-2 py-1"
                          >
                            <CiHeart size={25} />
                            <span className="text-sm opacity-50">
                              {likeEvents[c.commentId] ? c.likes + 1 : c.likes}
                            </span>
                          </button>
                          <span className="opacity-50">
                            {timeAgo(c.createdDate)}
                          </span>
                          <span>{c.comment}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeedbackComment;
