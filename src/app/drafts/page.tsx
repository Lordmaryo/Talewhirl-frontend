"use client";
import React, { useEffect, useState } from "react";
import { loadDrafts, ResponseProps } from "../api/ApiServices";
import DraftCard from "../components/DraftCard";
import Spinner from "../loaders/Spinner";

const DraftsPage = () => {
  const [bookResponse, setBookResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadDrafts(setBookResponse);
  }, []);

  if (!bookResponse) return <Spinner />;
  return (
    <div className="py-16 px-4">
      <h1 className="text-xl font-bold text-center pt-5">Drafts</h1>
      {bookResponse?.content.length ? (
        bookResponse?.content.map((book) => (
          <>
            <div className="w-full mx-auto mt-10">
              <DraftCard key={book.id} book={book} />
            </div>
          </>
        ))
      ) : (
        <div className="text-center pt-5">
          <h2 className=" font-bold text-2xl lg:text-3xl">Drafts are empty</h2>
          <p className="text-zinc-500 mt-2">
            saved but not published work will be saved here
          </p>
        </div>
      )}
    </div>
  );
};

export default DraftsPage;
