import React from "react";
import allGenresData from "../data/genres.json";

type GenreSelectorProps = {
  setAllGenres: (allGenres: string[]) => void;
  allGenres: string[];
  setSingleGenre: (data: string) => void;
};

const GenreSelector = ({
  setAllGenres,
  allGenres,
  setSingleGenre,
}: GenreSelectorProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let values = e.target.value;
    setSingleGenre(values);
    setAllGenres([...allGenres, values]);
  };

  return (
    <div>
      <select className="p-2" required onChange={handleSelectChange}>
        <option value="">select Genres</option>
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
