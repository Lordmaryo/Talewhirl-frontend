import Image from "next/image";
import { Book } from "../api/ApiServices";
import Link from "next/link";

type CardProps = {
  book: Book;
};
const Card = ({ book }: CardProps) => {
  const everyWordLength = book.chapters
    .map((chapter) => chapter.content.split(/\s+/).length)
    .reduce((a, b) => a + b, 0);
  const averageWpm = 200;
  const bookReadTime = Math.ceil(everyWordLength / averageWpm); // per min

  const interval = (time: number) => {
    return time > 59 ? `${Math.floor(time / 60)}h` : `${time}m`;
  };

  const truncateWord = (word: string | null, maxLength: number) => {
    if (!word) return word;

    const numOfWords = word.length;
    return numOfWords > maxLength
      ? word.slice(0, maxLength) + " see more..."
      : word;
  };

  return (
    <div className="relative">
      <Link href={"/"}>
        <Image
          src={`data:image/jpeg;base64,${book.cover}`}
          className="h-full w-full object-cover rounded-md"
          width={100}
          height={100}
          alt="book covers"
        />
        <div className="flex flex-row justify-between absolute bottom-0 h-full w-full bg-gradient-to-t from-[#0b1c0bc3] to-transparent">
          <h3 className="absolute text left-2 bottom-2 w-[70%]">
            {truncateWord(book.title, 50)}
          </h3>
          <h3 className="absolute text-sm right-2 bottom-2 font-bold">
            {interval(bookReadTime)}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;
