import React, { useEffect, useState } from "react";
import defaultProfile from "../image/default-profile.png";
import {
  FeedbackResponseProps,
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
interface FeedbackCommentProps {
  bookId: number;
}

const FeedbackComment = ({ bookId }: FeedbackCommentProps) => {
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackResponse, setFeedbackResponse] =
    useState<FeedbackResponseProps>();
  const [userData, setUserData] = useState<UserResponse | null>(null);
  // let userId = 303;

  useEffect(() => {
    loadFeedbackComments();
    // loadUser({ userId, setUserData: setUserData });
  }, []);

  // console.log("User data", userData);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackComment("");
  };

  return (
    <div className="max-w-[520px] py-10">
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="w-full bg-[#272727] py-2 px-6 rounded-md">
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
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                />
              </form>
            </div>
            <div>
              {feedbackResponse?.content.map((c, index) => {
                return (
                  <div key={index} className="flex flex-row justify-between">
                    <div>{userData?.username}</div>
                    <div>{c.comment}</div>
                  </div>
                );
              })}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeedbackComment;
