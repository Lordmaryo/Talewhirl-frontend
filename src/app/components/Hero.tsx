"use client";
import React, { useEffect, useState } from "react";
import baseApi from "../api/baseApi";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ResponseProps } from "../api/ApiServices";
import Herocard from "./Herocard";

const Hero = () => {
  const [response, setResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const page = 0;
    const size = 5;
    try {
      const { data } = await baseApi.get(
        `book/all-books?page=${page}&size=${size}`
      );
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Splide
        options={{
          perPage: 1,
          drag: false,
          pagination: true,
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
      <div></div>
    </div>
  );
};

export default Hero;
