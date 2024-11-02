"use client";
import { ResponseProps } from "@/app/api/ApiServices";
import { baseApi } from "@/app/api/baseApi";
import BookResultsCard from "@/app/components/BookResultsCard";
import GenresGroupCard from "@/app/components/GenresGroupCard";
import Spinner from "@/app/loaders/Spinner";
import { capitalizeWords, genreDescription } from "@/app/utilities/Helpers";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

type GenrePageProps = {
  params: {
    genre: string;
  };
};

const GenrePage = ({ params }: GenrePageProps) => {
  const [bookData, setBookData] = useState<ResponseProps | null>(null);
  const genreParam = params.genre as string;
  const genre = capitalizeWords(genreParam.replace(/-/g, " "));

  useEffect(() => {
    if (genre) loadBookByGenres();
  }, [genre]);

  const loadBookByGenres = async () => {
    const page = 0;
    const size = 2; // change to 20 by default
    try {
      const { data } = await baseApi.get<ResponseProps>(
        `book/genre/${genre}?page=${page}&size=${size}`
      );
      setBookData(data);
    } catch (error) {
      console.error("Error fetching genres", error);
    }
  };

  if (!bookData) return <Spinner />;
  return (
    <div className="min-h-screen px-4 pt-16">
      <button
        onClick={() => window.history.back()}
        className="flex flex-row gap-x-2 items-center py-2 px-2 rounded-lg transition-colors hover:bg-[#202020]"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="font-bold text-2xl">{genre}</h1>
        <p className="text-zinc-500 px-4">{genreDescription(genre)}</p>
      </div>
      <div className="py-10 flex flex-col md:flex-row justify-between gap-x-2">
        <div className="">
          {bookData?.content.map((book) => (
            <BookResultsCard key={book.id} book={book} />
          ))}
        </div>
        <div className="py-10 md:py-0">
          <GenresGroupCard />
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
