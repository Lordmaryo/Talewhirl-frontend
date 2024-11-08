"use client";
import { Book } from "@/app/api/ApiServices";
import { baseApi } from "@/app/api/baseApi";
import Feedback from "@/app/components/Feedback";
import Spinner from "@/app/loaders/Spinner";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  LiaLongArrowAltDownSolid,
  LiaLongArrowAltUpSolid,
} from "react-icons/lia";

type ReadBookProps = {
  params: {
    id: string;
    title: string;
  };
};

const ReadBook = ({ params }: ReadBookProps) => {
  const [bookData, setBookData] = useState<Book | null>(null);
  const bookId = params.id;
  const [chapterIndex, setChapterIndex] = useState<number>(0);

  useEffect(() => {
    const loadInitialChapterIndex = () => {
      const savedIndex = localStorage.getItem(`currChapterIndex_${bookId}`);
      setChapterIndex(savedIndex ? Number(savedIndex) : 0);
    };

    loadInitialChapterIndex();
    getBookById(bookId);
    handleReadBook();
  }, [bookId]);

  useEffect(() => {
    if (bookData) {
      localStorage.setItem(`currChapterIndex_${bookId}`, String(chapterIndex));
    }
  }, [chapterIndex, bookId, bookData]);

  const getBookById = async (id: string) => {
    try {
      const { data } = await baseApi.get<Book>(`book/${id}`);
      setBookData(data);
    } catch (error) {
      console.error("Error fetching book", error);
    }
  };

  const handleReadBook = async () => {
    try {
      await baseApi.post(`book/${bookId}/read`);
    } catch (error) {
      console.error("Error marking book as read", error);
    }
  };

  const totalNumOfChapters = bookData?.numOfChapters;
  const isFirstChap = chapterIndex === 0;
  const isLastChap =
    totalNumOfChapters !== undefined && chapterIndex + 1 === totalNumOfChapters;
  const currentChapter = bookData?.chapters[chapterIndex]; // shows current index of chapter to the page

  const handleNextChap = () => {
    if (!isLastChap) {
      setChapterIndex((prevIndex) => prevIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousChap = () => {
    setChapterIndex((prevIndex) => prevIndex - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollUp = () => {
    window.scrollBy({ top: -100, behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollBy({ top: 100, behavior: "smooth" });
  };

  if (!bookData || !currentChapter) return <Spinner />;
  return (
    <div className="pt-16">
      <div className="z-10 sticky top-16 backdrop-blur-md flex flex-row justify-between px-4 sm:px-10 items-center">
        <button
          className={
            !isFirstChap
              ? "flex flex-row gap-x-3 items-center pr-2"
              : "invisible"
          }
          onClick={handlePreviousChap}
        >
          <FaArrowLeft size={20} />
          <span className="font-bold">Previous chapter</span>
        </button>
        <button
          onClick={handleNextChap}
          className={
            !isLastChap
              ? "flex flex-row gap-x-3 items-center pl-2"
              : "invisible"
          }
        >
          <span className="font-bold">Next chapter</span>
          <FaArrowRight size={20} />
        </button>
      </div>
      <div className="px-4 md:px-10 py-10">
        <h1 className="text-2xl md:3xl lg:text-4xl font-bold">
          Chapter {currentChapter?.chapterNum}: {currentChapter?.chapterName}
        </h1>
        <div className="py-2 flex flex-row gap-4 items-center">
          <div className="w-full h-px bg-zinc-500"></div>
          <span className="text-zinc-500">Epigraph</span>
          <div className="w-full h-px bg-zinc-500"></div>
        </div>
        <p className="text-center text-sm italic font-semibold pb-6 text-zinc-400">
          {currentChapter.epigraph}
        </p>
      </div>
      <div className="px-4 md:px-10 flex gap-6 justify-between relative">
        <div className="hidden md:block w-[40%] sticky top-28 h-screen my-4">
          <Image
            src={`data:image/jpeg;base64,${bookData?.cover}`}
            className="lg:w-56 lg:h-80 w-52 h-72 object-cover rounded-md"
            alt="book cover"
            width={100}
            height={100}
          />
          <h1 className="font-bold md:text-2xl lg:text-3xl py-4">
            {bookData.title}
          </h1>
          <h2>by, {bookData.owner}</h2>
        </div>

        <div className="hidden h-screen sticky top-1/2 gap-y-20 md:flex flex-col gap-10 items-center">
          <button title="Scroll up" onClick={scrollUp}>
            <LiaLongArrowAltUpSolid size={30} />
          </button>
          <button title="Scroll down" onClick={scrollDown}>
            <LiaLongArrowAltDownSolid size={30} />
          </button>
        </div>

        <div className="w-full mb-5 sm:mb-10">
          <p>{currentChapter?.content}</p>
          {isLastChap ? (
            <div>
              <h2 className="text-xl font-bold my-10">
                You're done reading this book, share your thoughts! below
              </h2>
              <div className="mt-48">
                <Feedback
                  getRate={bookData.rate}
                  bookId={Number(bookId)}
                  sharable={bookData.sharable}
                />
              </div>
            </div>
          ) : (
            <button
              onClick={handleNextChap}
              className="justify-center py-2 rounded-lg my-10 flex flex-row gap-x-2 items-center bg-white text-black w-full hover:bg-zinc-200 transition-colors font-bold "
            >
              <span>Continue to next chapter</span>
              <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadBook;
