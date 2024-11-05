import React, { useEffect, useState } from "react";
import { loadPublished, ResponseProps } from "../api/ApiServices";
import Card from "./Card";
import Spinner from "../loaders/Spinner";

const Published = () => {
  const [bookResponse, setBookResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadPublished(setBookResponse);
  }, []);

  if (!bookResponse?.content) return <Spinner />;
  return (
    <div className="min-h-screen pb-10 pt-4">
      {bookResponse?.content.length ? (
        <div className="px-4 flex flex-wrap gap-4 justify-center">
          {bookResponse?.content.map((book) => (
            <div className="md:[200px] sm:w-[180px] w-[160px]">
              <Card key={book.id} book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className=" font-bold text-2xl lg:text-3xl">
            No Book Published yet
          </h2>
          <p className="text-zinc-500 mt-2">
            Published Books will be stored here
          </p>
        </div>
      )}
    </div>
  );
};

export default Published;
