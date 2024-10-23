"use client";
import { Book } from "@/app/api/ApiServices";
import Image from "next/image";
import baseApi from "../../api/baseApi";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegClock, FaStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import Button from "@/app/components/Button";
import ButtonTransparent from "@/app/components/ButtonTransparent";

type PageProps = {
  params: { id: string };
};

const Details = ({ params }: PageProps) => {
  const id = params.id;
  const [book, setBook] = useState<Book | null>();

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const everyWordLength: any = book?.chapters
    .map((chapter) => chapter.content.split(/\s+/).length)
    .reduce((a, b) => a + b, 0);
  const averageWpm = 200;
  const bookReadTime = Math.ceil(everyWordLength / averageWpm); // per min

  const truncateWord = (word: string | any, maxLength: number) => {
    if (!word) return word;

    const numOfWords = word.length;
    return numOfWords > maxLength ? word.slice(0, maxLength) + "..." : word;
  };

  const interval = (time: number) => {
    return time > 59 ? `${Math.floor(time / 60)}h` : `${time}m`;
  };

  const HandleClick = () => {
    console.log("Hello!");
  };

  const fetchBookDetails = async () => {
    try {
      const { data } = await baseApi.get(`book/${id}`);
      setBook(data);
    } catch (error) {
      console.error(error);
    }
  };

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
        <div>
          <h1 className="font-medium text-xl sm:text-2xl md:text-3xl xl:text-5xl">
            {truncateWord(book?.title, 40)} and it havent even ended yet.
          </h1>
          <Link
            href={"/"}
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
              ?.map((g) => <span className="pr-2"> {g}</span>)
              .slice(0, 3)}
          </div>
          <div className="md:mt-5 mt-3 text-[#ffffffb3] font-medium">
            {/* shouldbe createdAt */}
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
              <span>{interval(bookReadTime)}</span>
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
          <span>{interval(bookReadTime)}</span>
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
        <Button label="Read Now" />
        <ButtonTransparent onClick={HandleClick} label="Add to bookmark" />
      </div>
      <div className="mt-20 md:w-[70%]">
        <h2 className="font-bold text-xl sm:text-2xl md:text-2xl pb-4">
          Overview
        </h2>
        <p>
          {book?.synopsis}
          {book?.synopsis}
          {book?.synopsis}
        </p>
      </div>
    </div>
  );
};

export default Details;
