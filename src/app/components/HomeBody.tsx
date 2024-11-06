"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Book, loadTopTen, ResponseProps } from "../api/ApiServices";
import Card from "./Card";
import NavItem from "./NavItem";
import HomeBodyLoader from "../loaders/HomeBodyLoader";
import { checkAuthenication } from "../token/Token";
import { baseApi } from "../api/baseApi";

const HomeBody = () => {
  const [bookResponse, setBookResponse] = useState<ResponseProps | null>(null);
  const [topTen, setTopTen] = useState<Book[] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadBooks();
    loadTopTen(setTopTen);
  }, []);

  useEffect(() => {
    checkAuthenication(setIsAuthenticated);
  }, []);

  const loadBooks = async () => {
    const page = 0;
    const size = 20;
    try {
      const { data } = await baseApi.get(
        `book/all-books?page=${page}&size=${size}`
      );
      setBookResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!bookResponse) return <HomeBodyLoader />;

  return (
    <div className="relative py-6 px-4 md:px-6">
      {isAuthenticated && (
        <>
          <h2 className="font-bold sm:text-xl mb-2">Recommended for you</h2>
          <Splide
            options={{
              perPage: 5,
              drag: true,
              pagination: false,
              gap: "1.2rem",
              arrows: true,
              breakpoints: {
                1024: { perPage: 3 },
                1200: { perPage: 4 },
                640: { perPage: 2 },
              },
            }}
          >
            {bookResponse.content.map((book) => (
              <SplideSlide key={book.id}>
                <Card book={book} />
              </SplideSlide>
            ))}
          </Splide>
        </>
      )}
      <div className="gap-y-6 lg:px-5 flex flex-wrap md:flex-nowrap flex-col-reverse lg:flex-row justify-between mt-6">
        <div>
          <h2 className="font-bold sm:text-xl mb-2">Explore</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {bookResponse.content.map((book) => (
              <div className="max-w-52" key={book.id}>
                <Card book={book} />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:ml-4 lg:bg-[#252424] p-4 rounded-md self-start">
          <h2 className="font-bold mb-2">Top Ten</h2>
          {topTen?.map((book, index) => (
            <div className="max-w-60" key={book.id}>
              <NavItem book={book} numberings={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
