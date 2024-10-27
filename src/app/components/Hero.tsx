"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ResponseProps } from "../api/ApiServices";
import Herocard from "./Herocard";
import HomeLoader from "../loaders/HomeLoader";
import { baseApi } from "../api/baseApi";

const Hero = () => {
  const [response, setResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const { data } = await baseApi.get(`book/trending_weekly`);
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };
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
