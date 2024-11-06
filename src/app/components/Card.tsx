import Image from "next/image";
import { Book } from "../api/ApiServices";
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";
import { averageReadTime, interval, truncateWord } from "../utilities/Helpers";

type CardProps = {
  book: Book;
};
const Card = ({ book }: CardProps) => {
  const chapter = book.chapters;
  const readTime = averageReadTime(chapter);

  return (
    <div className="relative">
      <Link href={"/details/" + book.id}>
        <Image
          src={`data:image/jpeg;base64,${book.cover}`}
          className="h-[250px] w-full object-cover rounded-md"
          width={100}
          height={100}
          alt="book covers"
        />
        <h2 className="absolute top-0 left-0 font-bold rounded-r-md p-1 text-zinc-400 flex flex-row gap-1 items-center text-sm">
          <FiBookOpen />
          <span>{book.numOfChapters}</span>
        </h2>
        <div className="flex flex-row justify-between absolute bottom-0 h-full w-full bg-gradient-to-t from-[#0b1c0bc3] to-transparent">
          <h3 className="absolute text left-2 bottom-2 w-[70%] text-sm">
            {truncateWord(book.title, 25)}
          </h3>
          <h3 className="absolute text-sm right-2 bottom-2 font-bold">
            {interval(readTime)}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;
