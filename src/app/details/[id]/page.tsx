"use client";
import { Book, deleteBook, fetchBookById } from "@/app/api/ApiServices";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegClock, FaStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import Button from "@/app/components/Button";
import Spinner from "@/app/loaders/Spinner";
import Feedback from "@/app/components/Feedback";
import {
  averageReadTime,
  interval,
  timeAgo,
  truncateWord,
} from "@/app/utilities/Helpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuthenication } from "@/app/token/Token";
import { useRouter } from "next/navigation";

export type PageProps = {
  params: { id: string };
};

const Details = ({ params }: PageProps) => {
  const bookId = params.id;
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchBookById(bookId, setBook);
    checkAuthenication(setIsAuthenticated);
  }, [bookId]);

  const chapter = book?.chapters;
  const readTime = averageReadTime(chapter);

  const [clickedDelete, setClickedDelete] = useState(false);

  const triggerDelete = () => {
    setClickedDelete(!clickedDelete);
  };

  if (!book) return <Spinner />;
  return (
    <>
      {clickedDelete && (
        <div
          className="text-center flex flex-col justify-center items-center gap-4 m-auto z-10 bg-[#383838]
           rounded-md sm:max-w-[400px] w-[80%] md:max-w-[620px] h-[300px] fixed
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div>
            <h2 className="text-xl pb-2">Are you sure you want to delete</h2>
            <span className="font-bold pt-2 text-red-500">{book.title}</span>
          </div>
          <p className="text-red-500 text-sm">
            Actions can NOT be undone and all data about this book will be lost.
          </p>
          <Button
            className="bg-red-500"
            label="Yes, delete"
            onClick={() => {
              if (isAuthenticated) { // not required just to satisfy eslint
                deleteBook(book?.id);
              }
              setClickedDelete(!clickedDelete);
              router.push("/drafts");
            }}
          />
          <Button
            className="bg-transparent"
            label="Cancel"
            onClick={() => setClickedDelete(false)}
          />
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="pt-20 px-6 md:px-12 pb-10">
        <div className="flex flex-row gap-x-4">
          <Image
            src={`data:image/jpeg;base64,${book?.cover}`}
            className="xl:h-[300px] lg:h-[260px] lg:w-[210px] md:h-[270px] 
          md:w-[190px] sm:h-[230px] sm:w-[170px] rounded-md 
          object-cover h-[180px] w-[100px]"
            width={50}
            height={100}
            alt={book?.title + ""}
          />
          <div className="lg:max-w-[70%]">
            <h1 className="font-medium text-xl sm:text-2xl md:text-3xl xl:text-5xl">
              {truncateWord(book?.title, 40)}
            </h1>
            <Link
              href={`/profile/${book.createdBy}`}
              className="hover:underline transition-all border-[#ffffffa2]"
            >
              <h2
                className="md:mt-5 mt-3 fnt-bold text-[#ffffffa2]"
                title="View author"
              >
                {book?.owner}
              </h2>
            </Link>
            <div className="divide-x-2 md:mt-5 mt-3">
              {book?.genres
                ?.map((g, index) => (
                  <span className="pr-2" key={index}>
                    {" "}
                    {g}
                  </span>
                ))
                .slice(0, 3)}
            </div>
            <div className="text-sm sm:text-base md:mt-5 mt-3 text-[#ffffffb3] font-medium">
              {book.sharable ? (
                <span>published {timeAgo(book.createdDate)}</span>
              ) : (
                <span>Not yet published</span>
              )}
            </div>
            <div
              className="hidden md:mt-8 mt-3 sm:flex flex-row 
          items-center gap-x-2 font-bold"
            >
              <div className="flex flex-row items-center gap-1 border-r-2 pr-4">
                <span>{!book?.rate ? "0.0" : book.rate}</span>
                <FaStar />
              </div>
              <div className="flex flex-row items-center gap-1 px-2">
                <FaRegClock />
                <span>{interval(readTime)}</span>
              </div>
              <div className="flex flex-row items-center gap-1 border-l-2 px-4">
                <FiBookOpen />
                <span>{book?.numOfChapters}</span>
              </div>
              <div className="flex flex-row items-center gap-1 border-l-2 pl-4">
                <span>PG-{book?.pgRating || "Not set"}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex md:mt-8 mt-3 sm:hidden flex-row items-center 
      gap-x-2 font-bold"
        >
          <div className="flex flex-row items-center gap-1 border-r-2 pr-4">
            <span>{!book?.rate ? "0.0" : book.rate}</span>
            <FaStar />
          </div>
          <div className="flex flex-row items-center gap-1 px-2">
            <FaRegClock />
            <span>{interval(readTime)}</span>
          </div>
          <div className="flex flex-row items-center gap-1 border-l-2 px-4">
            <FiBookOpen />
            <span>{book?.numOfChapters}</span>
          </div>
          <div className="flex flex-row items-center gap-1 border-l-2 pl-4">
            <span>PG-{book?.pgRating}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row mt-6">
          {book.sharable ? (
            <Link
              href={`/read/${book.id}/${book.title.replace(/\s+/g, "-")}`}
              className=""
            >
              <Button className="w-full" label="Read Now" />
            </Link>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row mt-6 justify-center">
              <Button
                label="Delete"
                className="bg-red-500 w-full"
                onClick={triggerDelete}
              />
            </div>
          )}
        </div>
        <div className="mt-20 md:w-[70%]">
          <h2 className="font-bold text-xl sm:text-2xl md:text-2xl pb-4">
            Overview
          </h2>
          <p>{book?.synopsis || "Nothing yet"}</p>
        </div>
        <div>
          <Feedback
            getRate={book.rate}
            bookId={book.id}
            sharable={book.sharable}
          />
        </div>
      </div>
    </>
  );
};

export default Details;
