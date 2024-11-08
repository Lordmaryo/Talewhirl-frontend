import React from "react";
import { Book } from "../api/ApiServices";
import Image from "next/image";
import Link from "next/link";
import { RxEyeOpen } from "react-icons/rx";
import { formatViews, truncateWord } from "../utilities/Helpers";

type BookProps = {
  book: Book;
  numberings: number;
};
const NavItem = ({ book, numberings }: BookProps) => {
  return (
    <Link
      href={"/details/" + book.id}
      className="flex flex-row flex-nowrap gap-2 items-center w-full py-2"
    >
      <h1 className="text-3xl font-bold text-[#ffffff79]">
        {numberings < 9 && 0}
        {numberings + 1}
      </h1>
      <div className="flex flex-row">
        <Image
          className="h-[70px] w-[58px] object-cover rounded-md"
          src={`data:image/jpeg;base64,${book.cover}`}
          alt="book cover"
          width={100}
          height={100}
        />
        <div className="ml-2 text-sm xl:text-sm lg:text-xs">
          <h2>{truncateWord(book.title, 20)}</h2>
          <div className="flex items-center gap-2 font-bold text-[#ffffff8f]">
            <RxEyeOpen />
            <span className="font-semibold text-sm xl:text-sm lg:text-xs">
              {formatViews(book.readCount)} views
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavItem;
