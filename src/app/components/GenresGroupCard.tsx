import React from "react";
import allGenres from "../data/genres.json";
import Link from "next/link";

const GenresGroupCard = () => {
  return (
    <div className="py-4 px-6 w-full lg:w-[400px] md:w-[300px] bg-zinc-800 rounded-md">
      <h1 className="text-xl font-bold pb-6">Genres</h1>
      <div className="flex flex-col">
        {allGenres.genres.map((genre) => (
          <Link
            className="w-full text-sm py-2 hover:font-bold"
            href={`/genre/${genre.name.replace(/\s+/g, "-").toLowerCase()}`}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenresGroupCard;
