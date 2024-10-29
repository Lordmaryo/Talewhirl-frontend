import React, { useEffect, useState } from "react";
import defaultProfile from "../image/default-profile.png";
import {
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
import { timeSince } from "../utilities/FormatDate";

interface FeedbackCommentProps {
  bookId: number;
}

const FeedbackComment = ({ bookId }: FeedbackCommentProps) => {
  const [comment, setComment] = useState("");
  const [feedbackResponse, setFeedbackResponse] =
    useState<FeedbackCommentResponseProps>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showComment, setShowComment] = useState("");
  const [userData, setUserData] = useState<UserResponse>();
  const [likeEvents, setLikeEvents] = useState<Record<number, boolean>>({});
  const [userId, setUserId] = useState(0);
  /**
   * TODO - update feedbackresponse so that when a new comment is added it
   *  get automatically stacked in the array
   */
  useEffect(() => {
    loadFeedbackComments();
    // loadUser(c.createdBy, setUserData);
  }, []);

  const loadFeedbackComments = async () => {
    const page = 0;
    const size = 10;
    try {
      const { data } = await baseApi.get(
        `feedback_comments/book/${bookId}?page=${page}&size=${size}`
      );
      setFeedbackResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowComment(comment);
    try {
      await baseApi.post("feedback_comments/add_comment", {
        comment,
        bookId,
      });
      setIsSubmitted(true);
      setComment("");
    } catch (error: any) {
      console.error(error.response.data.businessErrorDescription);
      console.error(error.response.data.validationErrors);
    }
  };

  const handleLike = async (commentId: number) => {
    try {
      const isLiked = likeEvents[commentId];
      if (isLiked) {
        await baseApi.post(`feedback_comments/${commentId}/unlike`);
      } else {
        await baseApi.post(`feedback_comments/${commentId}/like`);
      }

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
                    placeholder="add a feedback"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </form>
              </div>
              <div>
                <div>
                  {isSubmitted && (
                    <div className="flex flex-row gap-2 py-6 relative">
                      <Image
                        src={defaultProfile}
                        className="h-8 w-8 rounded-full"
                        alt="default-profile"
                      />
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <span className="font-bold">
                            {userData?.firstname}
                          </span>
                          <button className="absolute top-2 right-2 hover:border-zinc-600 hover:border rounded-lg px-2 py-1">
                            <CiHeart />
                            <span>0</span>
                          </button>
                        </div>
                        <span className="opacity-50">3 months ago</span>
                        <span>{showComment}</span>
                      </div>
                    </div>
                  )}
                  {feedbackResponse?.content.map((c) => {
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
                            {userData?.firstname}
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
                          <span className="opacity-50">{timeSince(c.createdDate)}</span>
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
