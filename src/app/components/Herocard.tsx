import Image from "next/image";
import { Book } from "../api/ApiServices";
import { FaRegClock, FaStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

type HeroCardProps = {
  book: Book;
  numbering: number;
};

const Herocard = ({ book, numbering }: HeroCardProps) => {
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
    return numOfWords > maxLength ? word.slice(0, maxLength) + "..." : word;
  };

  return (
    <div className="relative">
      <Image
        className="w-full object-cover md:h-screen"
        priority={true}
        src={`data:image/jpeg;base64,${book.backgroundCover}`}
        width={100}
        height={100}
        alt="book backgroud cover"
      />
      <div className="absolute bottom-0 h-full w-full bg-gradient-to-r from-[#171717] to-transparent">
        <h2 className="absolute top-5 sm:text-base text-sm left-8 font-bold text-[#ffffff71]">
          Top trending
        </h2>
        <div className="pb-20 md:pl-10 p-5 absolute md:bottom-0 -bottom-14  lg:w-1/2 md:w-[70%] sm:w-[60%]">
          <h1 className="text-3xl font-bold text-[#ffffff82] sm:text-4xl md:text-6xl lg:text-8xl">
            0{numbering + 1}
          </h1>
          <div>
            <p className="sigmar-regular text-xl font-bold md:text-3xl lg:text-4xl">
              {book.title}
            </p>
          </div>
          <div className="hidden flex-row items-center gap-4 mt-2 sm:flex">
            <div className="divide-x-2">
              {book.genres
                ?.map((g) => <span className="px-2">{g}</span>)
                .slice(1)}
            </div>
            <div className="flex flex-row items-center gap-1">
              <FaRegClock />
              <span>{interval(bookReadTime)}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <FaStar />
              <span>{!book.rate ? "No rate yet" : book.rate}</span>
            </div>
          </div>
          <p className="pt-6 hidden sm:block md:text-base text-sm">
            {truncateWord(book.synopsis, 150)}
            {/* truncate if its over a certain word*/}
          </p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <Link href={"/"}>
              <button className="flex flex-row items-center gap-1 font-semibold hover:bg-[#ffffffba] transition-colors bg-white text-black sm:px-5 px-3 py-2 rounded-lg">
                <FiBookOpen />
                <span>Read now</span>
              </button>
            </Link>
            <Link href={"/details/" + book.id}>
              <button className="flex flex-row items-center gap-1 font-semibold rounded-lg hover:bg-[#ffffff10] transition-colors text-white border sm:px-5 py-2 px-3">
                <span>View details</span>
                <MdOutlineKeyboardArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herocard;
