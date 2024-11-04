"use client";
import React, { useEffect, useState } from "react";
import { loadPublished, ResponseProps } from "../api/ApiServices";
import BookResultsCard from "../components/BookResultsCard";
import Spinner from "../loaders/Spinner";

const PublishedPage = () => {
  const [bookResponse, setBookResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadPublished(setBookResponse);
  }, []);

  if (!bookResponse) return <Spinner />;
  return (
    <div className="pt-16 px-4">
      {bookResponse?.content.length ? (
        bookResponse?.content.map((book) => (
          <>
            <h1 className="text-xl font-bold text-center pt-5">Published</h1>
            <div className="w-full mx-auto mt-10">
              <BookResultsCard book={book} />
            </div>
          </>
        ))
      ) : (
        <div className="text-center pt-5">
          <h2 className=" font-bold text-2xl lg:text-3xl">
            Published are empty
          </h2>
          <p className="text-zinc-500 mt-2">
            Published work will be shown here
          </p>
        </div>
      )}
    </div>
  );
};

export default PublishedPage;
