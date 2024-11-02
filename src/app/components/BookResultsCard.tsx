import React from "react";
import { Book } from "../api/ApiServices";
import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "../utilities/Helpers";

type BookResultsCardProps = {
  book: Book;
};

const BookResultsCard = ({ book }: BookResultsCardProps) => {
  return (
    <Link
      href={"/details/" + book?.id}
      className="w-full py-2 flex flex-row gap-x-3"
    >
      <Image
        src={`data:image/jpeg;base64,${book?.cover}`}
        className="w-16 h-24 md:w-28 md:h-40 object-cover rounded-md"
        width={100}
        height={100}
        alt="book covers"
      />
      <div>
        <h2 className="font-bold text-base sm:text-xl">{book?.title}</h2>
        <div className="text-zinc-400 text-sm flex flex-row items-center gap-x-4">
          <span>{book?.numOfChapters} chapters</span>
          <span>{timeAgo(book?.createdDate)}</span>
        </div>
        <div className="text-zinc-500 text-sm flex flex-row items-center gap-4 py-1">
          {book?.genres.map((g, index) => (
            <span key={index}>{g}</span>
          ))}
        </div>
        <p className="text-sm">{book?.synopsis}</p>
      </div>
    </Link>
  );
};

export default BookResultsCard;
