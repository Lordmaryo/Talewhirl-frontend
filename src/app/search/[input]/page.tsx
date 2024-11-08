"use client";
import { ResponseProps } from "@/app/api/ApiServices";
import { baseApi } from "@/app/api/baseApi";
import BookResultsCard from "@/app/components/BookResultsCard";
import React, { useEffect, useState } from "react";

type SearchPageProps = {
  params: {
    input: string;
  };
};
const SearchPage = ({ params }: SearchPageProps) => {
  const [searchResponse, setSearchResponse] = useState<ResponseProps | null>(
    null
  );
  const searchedWord = params.input;
  const readableSearchedWord = searchedWord.replaceAll("%20", " ");

  useEffect(() => {
    handleSearchQuery();
  }, [searchedWord]);

  const handleSearchQuery = async () => {
    const page = 0;
    const size = 10;
    try {
      const { data } = await baseApi.get<ResponseProps>(
        `book/search_books?query=${searchedWord}&page=${page}&size=${size}`
      );
      setSearchResponse(data);
    } catch (error) {
      console.error(`Error searching ${readableSearchedWord}`, error);
    }
  };

  return (
    <div className="py-16 px-4">
      <h2 className="py-5 font-bold text-xl text-zinc-400">
        Search result for "{readableSearchedWord}"
      </h2>
      {searchResponse?.content.length !== 0 ? (
        <div>
          {searchResponse?.content.map((book) => (
            <div className="space-y-4">
              <BookResultsCard key={book.id} book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          No results for{" "}
          <span className="font-bold">{readableSearchedWord}</span>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
