"use client";
import React, { useEffect, useState } from "react";
import {
  Book,
  loadTopTen,
  loadTrendingWeekly,
  ResponseProps,
} from "../api/ApiServices";
import Card from "../components/Card";
import NavItem from "../components/NavItem";
import Spinner from "../loaders/Spinner";

const TrendingPage = () => {
  const [bookResponse, setBookRsponse] = useState<ResponseProps | null>(null);
  const [topTen, SetTopTen] = useState<Book[] | null>(null);

  useEffect(() => {
    loadTrendingWeekly(0, 20, setBookRsponse);
    loadTopTen(SetTopTen);
  }, []);

  if (!bookResponse) return <Spinner />;
  return (
    <div className="pt-16 pb-10 px-4">
      <div className="py-5 text-center">
        <h1 className="font-bold text-base md:text-2xl">Trending</h1>
        <p className="text-sm text-zinc-500">Current trending weekly</p>
      </div>
      <div className="lg:px-5 flex flex-wrap md:flex-nowrap flex-col gap-y-6 lg:flex-row justify-between mt-6">
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {bookResponse?.content.map((book) => (
              <div className="max-w-52" key={book.id}>
                <Card book={book} />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:ml-4 bg-[#252424] p-4 rounded-md">
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

export default TrendingPage;
