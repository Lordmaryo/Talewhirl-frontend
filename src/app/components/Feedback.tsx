import React, { useEffect, useState } from "react";
import { checkAuthenication } from "../token/Token";
import LoginPage from "../Authentication/LoginPage";
import FeedbackComment from "./FeedbackComment";
import { baseApi } from "../api/baseApi";

interface FeedbackProp {
  getRate: number;
  bookId: number;
}

const Feedback = ({ getRate, bookId }: FeedbackProp) => {
  const [note, setNote] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let reactionKey = 0;
  let comment = "This is the best book ever";
  let testNote = 5;

  useEffect(() => {
    checkAuthenication(setIsAuthenticated);
  }, []);

  const handleClick = (value: number) => {
    if (!isAuthenticated) {
      return <LoginPage />;
    }
    setNote(value);
    handleFeedbacks();
    console.log("Selected note:", value);
    console.log(
      isAuthenticated ? "User is Authenticated" : "User is not Authenticated"
    );
  };

  const handleFeedbacks: () => void = async () => {
    try {
      const response = await baseApi.post("feedbacks/add_feedback", {
        note: testNote,
        comment,
        bookId,
      });
      if (response) {
        console.log("Feedback added");
      } else console.log("Feedback not added");
    } catch (error) {
      console.error(error);
    }
  };

  const rateReactions: { [key: number]: string } = {
    1: "Bad",
    2: "Fine",
    3: "Good",
    4: "Amazing",
    5: "Excellent!",
  };

  const renderStars = () => {
    const stars = [];
    const maxRate = 5;
    for (let i = 1; i <= maxRate; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className={`relative cursor-pointer text-2xl ${
            i <= (hovered || note) ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </span>
      );
      if (hovered === i) reactionKey = i;
    }
    return stars;
  };

  return (
    <div className="pt-10">
      <h2 className="font-bold text-xl sm:text-2xl md:text-2xl pb-4">
        Rating and reviews
      </h2>
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:lg:text-5xl mb-2 text-[#ffffff93]">
        {getRate}
      </h1>
      <div>
        {renderStars()}
        <span className="pl-2 font-bold text-[#ffffffb6]">
          {rateReactions[reactionKey] || rateReactions[note]}
        </span>
      </div>
      <FeedbackComment bookId={bookId} />
    </div>
  );
};

export default Feedback;
