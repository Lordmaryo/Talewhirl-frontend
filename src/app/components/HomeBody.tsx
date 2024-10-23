"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import baseApi from "../api/baseApi";
import { Book, ResponseProps } from "../api/ApiServices";
import Card from "./Card";
import NavItem from "./NavItem";
import HomeLoader from "../loaders/HomeLoader";
import HomeBodyLoader from "../loaders/HomeBodyLoader";

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

  if (!bookResponse) return <HomeBodyLoader />;

  return (
    <div className="relative py-6 px-2 md:px-6">
      <h2 className="font-bold sm:text-xl mb-2">Recommended for you</h2>
      <Splide
        options={{
          perPage: 5,
          drag: true,
          pagination: false,
          gap: "1.2rem",
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
      <div className="flex flex-wrap md:flex-nowrap flex-col-reverse lg:flex-row justify-between mt-6">
        <div>
          <h2 className="font-bold mb-2">Trending</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {bookResponse?.map((book) => (
              <div className="max-w-52">
                <Card book={book} />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:ml-4 bg-[#252424] p-4 rounded-md">
          <h2 className="font-bold mb-2">Top Ten</h2>
          {bookResponse?.map((book, index) => (
            <div className="max-w-60">
              <NavItem book={book} numberings={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
