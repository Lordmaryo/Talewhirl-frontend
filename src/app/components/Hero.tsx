"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { loadTrendingWeekly, ResponseProps } from "../api/ApiServices";
import Herocard from "./Herocard";
import HomeLoader from "../loaders/HomeLoader";

const Hero = () => {
  const [response, setResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadTrendingWeekly(0, 10, setResponse);
  }, []);

  if (!response) return <HomeLoader />;
  return (
    <div>
      <Splide
        options={{
          perPage: 1,
          drag: true,
          pagination: true,
          arrows: false,
          type: "loop",
          autoplay: true,
          interval: 5000,
        }}
      >
        {response?.content.map((book, index) => (
          <SplideSlide key={book.id}>
            <Herocard book={book} numbering={index} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Hero;
