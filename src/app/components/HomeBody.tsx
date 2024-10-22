"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import baseApi from "../api/baseApi";
import { Book, ResponseProps } from "../api/ApiServices";
import Card from "./Card";

const HomeBody = () => {
  const [bookResponse, setBookResponse] = useState<Book[] | null>();
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const { data } = await baseApi.get(`book/top10`);
      setBookResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative py-6 px-2 md:px-6">
      <h2 className="font-bold sm:text-xl mb-2">Recommended for you</h2>
      <Splide
        options={{
          perPage: 5,
          drag: true,
          pagination: false,
          gap: "1.5rem",
          arrows: false,
          breakpoints: {
            1024: { perPage: 3 },
            1200: { perPage: 4 },
            640: { perPage: 2 },
          },
        }}
      >
        {bookResponse?.map((book) => (
          <SplideSlide key={book.id}>
            <Card book={book} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default HomeBody;
