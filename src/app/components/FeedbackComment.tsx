import React, { useEffect, useState } from "react";
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
//  TODO - add feedback comments props and an input to make a feedback
interface FeedbackCommentProps {
  bookId: number;
}

const FeedbackComment = ({ bookId }: FeedbackCommentProps) => {
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackResponse, setFeedbackResponse] =
    useState<FeedbackResponseProps>();
  const [userData, setUserData] = useState<UserResponse | null>(null);
  let userId = 303;

  useEffect(() => {
    loadFeedbackComments();
    loadUser({ userId, setUserData: setUserData });
  }, []);

  console.log("User data", userData);

  const loadFeedbackComments = async () => {
    const page = 0;
    const size = 10;
    try {
      const { data } = await baseApi.get(
        `feedbacks/book/${bookId}?page=${page}&size=${size}`
      );
      setFeedbackResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[520px] my-10">
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="w-full bg-[#272727] py-2 px-6 rounded-md">
                <div className="flex items-center gap-x-2">
                  <span className="font-bold">Comments</span>
                  <span>
                    {
                      feedbackResponse?.content.filter(
                        (f) => f.comment !== null && f.comment !== ""
                      ).length
                    }
                  </span>
                </div>
                <div className="bg-[#313131] m-2 p-1 rounded-lg text-center hover:bg-[#393939] transition-colors">
                  Click to add a comment
                </div>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
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
