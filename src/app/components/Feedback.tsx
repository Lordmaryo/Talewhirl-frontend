import React, { useEffect, useState } from "react";
import { checkAuthenication } from "../token/Token";
import LoginPage from "../Authentication/LoginPage";
import FeedbackComment from "./FeedbackComment";
import { baseApi } from "../api/baseApi";

interface FeedbackProp {
  getRate: number; // get total Book ratings
  bookId: number;
}

const Feedback = ({ getRate, bookId }: FeedbackProp) => {
  const [hovered, setHovered] = useState(0);
  const [note, setNote] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reaction, setReaction] = useState("");

  useEffect(() => {
    checkAuthenication(setIsAuthenticated);
  }, []);

  const handleClick = (value: number) => {
    if (!isAuthenticated) {
      return <LoginPage />;
    }
    setNote(value);
    setReaction(rateReactions[value]);
    handleFeedbacks(value);
  };

  const handleFeedbacks = async (value: number) => {
    try {
      await baseApi.post("feedbacks/add_feedback", {
        note: value,
        bookId,
      });
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
        <button
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => {
            setHovered(i);
            setReaction(rateReactions[i]);
          }}
          onMouseLeave={() => {
            setHovered(0);
            setReaction(rateReactions[0]);
          }}
          className={`relative cursor-pointer text-2xl ${
            i <= (hovered || note) ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </button>
      );
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
          {reaction || rateReactions[note]}
        </span>
      </div>
      <FeedbackComment bookId={bookId} />
    </div>
  );
};

export default Feedback;
