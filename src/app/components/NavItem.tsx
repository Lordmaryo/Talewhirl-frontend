import React from "react";
import { Book } from "../api/ApiServices";
import Image from "next/image";
import Link from "next/link";
import { RxEyeOpen } from "react-icons/rx";

type BookProps = {
  book: Book;
  numberings: number;
};
const NavItem = ({ book, numberings }: BookProps) => {
  const truncateWord = (word: string | null, maxLength: number) => {
    if (!word) return word;

    const numOfWords = word.length;
    return numOfWords > maxLength
      ? word.slice(0, maxLength) + " see more..."
      : word;
  };

  return (
    <Link
      href={"/details/" + book.id}
      className="flex flex-row flex-nowrap gap-2 items-center w-full py-2"
    >
      <h1 className="text-3xl md:text5xl font-extrabold text-[#ffffff79]">
        0{numberings + 1}
      </h1>
      <div className="flex flex-row">
        <Image
          className="w-[70px] object-cover rounded-md"
          src={`data:image/jpeg;base64,${book.cover}`}
          alt="book cover"
          width={100}
          height={100}
        />
        <div className="ml-2">
          <h2>{truncateWord(book.title, 20)}</h2>
          <div className="flex items-center gap-2 font-bold text-[#ffffff8f]">
            <RxEyeOpen />
            <span>{book.readCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavItem;
