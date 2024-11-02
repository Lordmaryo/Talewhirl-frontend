import { capitalizeName } from "@/app/utilities/Helpers";
import { FaArrowLeft } from "react-icons/fa";

type GenrePageProps = {
  params: {
    genre: string;
  };
};

const GenrePage = ({ params }: GenrePageProps) => {
  const genre = params.genre as string;

  return (
    <div className="px-4 pt-16">
      <button className="flex flex-row gap-x-2 items-center py-2 px-2 rounded-lg hover:bg-[#383838]">
        <FaArrowLeft />
        <span>Back</span>
      </button>
      <h1 className="pt-10 font-bold text-2xl">
        {capitalizeName(genre.replace(/-/g, " "))}
      </h1>
    </div>
  );
};

export default GenrePage;
