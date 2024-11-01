"use client";
import { Book } from "@/app/api/ApiServices";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegClock, FaStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import Button from "@/app/components/Button";
import ButtonTransparent from "@/app/components/ButtonTransparent";
import Spinner from "@/app/loaders/Spinner";
import Feedback from "@/app/components/Feedback";
import { baseApi } from "@/app/api/baseApi";
import {
  averageReadTime,
  interval,
  truncateWord,
} from "@/app/utilities/Helpers";

export type PageProps = {
  params: { id: string };
};

const Details = ({ params }: PageProps) => {
  const id = params.id;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const chapter = book?.chapters;
  const readTime = averageReadTime(chapter);

  const HandleClick = () => {
    console.log("Hello!");
  };

  const fetchBookDetails = async () => {
    try {
      const { data } = await baseApi.get(`book/${id}`);
      console.log("Book data:", data);
      setBook(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("details response state", book);
  if (!book) return <Spinner />;
  return (
    <div className="pt-20 px-6 md:px-12">
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
            {truncateWord(book?.title, 40)} and it havent even ended yet.
          </h1>
          <Link
            href={`/profile/${1}`}
            // change to book.createdBy when before deployment
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
          <div className="md:mt-5 mt-3 text-[#ffffffb3] font-medium">
            {/* should be createdAt */}
            24, september, 2024
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
              <span>PG-{book?.pgRating}</span>
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
        <Link
          href={`/read/${book.id}/${book.title.replace(/\s+/g, "-")}`}
          className=""
        >
          <Button className="w-full" label="Read Now" />
        </Link>
        <ButtonTransparent onClick={HandleClick} label="Add to bookmark" />
      </div>
      <div className="mt-20 md:w-[70%]">
        <h2 className="font-bold text-xl sm:text-2xl md:text-2xl pb-4">
          Overview
        </h2>
        <p>{book?.synopsis}</p>
      </div>
      <div>
        <Feedback getRate={book.rate} bookId={book.id} />
      </div>
    </div>
  );
};

export default Details;
