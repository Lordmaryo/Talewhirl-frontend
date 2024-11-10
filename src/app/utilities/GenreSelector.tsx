import React from "react";
import allGenresData from "../data/genres.json";

type GenreSelectorProps = {
  setGenres: (genres: string[]) => void;
  genres: string[];
};

const GenreSelector = ({ setGenres, genres }: GenreSelectorProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    if (!genres.includes(selectedGenre) && selectedGenre !== "") {
      setGenres([...genres, selectedGenre]);
    }
  };

  return (
    <div>
      <select
        className="p-2 bg-black text-white"
        value=""
        onChange={handleSelectChange}
      >
        <option value="">Select Genres</option>
        {allGenresData.genres.map((g, index) => (
          <option key={index} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
