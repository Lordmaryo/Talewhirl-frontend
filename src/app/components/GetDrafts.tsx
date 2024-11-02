import React, { useEffect, useState } from "react";
import { baseApi } from "../api/baseApi";
import { ResponseProps } from "../api/ApiServices";
import Card from "./Card";
import Spinner from "../loaders/Spinner";

const GetDrafts = () => {
  const [bookResponse, setBookResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadDrafts();
  }, []);

  console.log("drafts book", bookResponse);

  const loadDrafts = async () => {
    try {
      const { data } = await baseApi.get<ResponseProps>("/book/owner/drafts");
      setBookResponse(data);
    } catch (error) {
      console.error("Error loading drafts", error);
    }
  };

  if (!bookResponse) return <Spinner />;
  return (
    <div className="h-screen pb-10 pt-4">
      {bookResponse?.content.length ? (
        <div className="px-4 flex flex-wrap gap-4 justify-center">
          {bookResponse?.content.map((book) => (
            <div className="md:[200px] sm:w-[180px] w-[160px]">
              <Card book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className=" font-bold text-2xl lg:text-3xl">Drafts are empty</h2>
          <p className="text-zinc-500 mt-2">
            Saved but not published work will be shown here
          </p>
        </div>
      )}
    </div>
  );
};

export default GetDrafts;
