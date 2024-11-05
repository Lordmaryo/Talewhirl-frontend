import Link from "next/link";
import allGenres from "../data/genres.json";
import { truncateWord } from "../utilities/Helpers";

type GenresMenuProps = {
  setToggleMenu: (toggleMenu: boolean) => void;
};
const GenresMenu = ({ setToggleMenu }: GenresMenuProps) => {
  return (
    <div className="py-4 grid grid-cols-2 gap-4">
      {allGenres.genres.map((genre, index) => (
        <Link
          key={index}
          onClick={() => setToggleMenu(false)}
          className="w-full text-sm pr-2 py-2 hover:font-bold"
          href={`/genre/${genre.name.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {truncateWord(genre.name, 16)}
        </Link>
      ))}
    </div>
  );
};

export default GenresMenu;
