import React from "react";
import { truncateWord } from "../utilities/Helpers";

type ChapterProps = {
  chapters: {
    chapterName: string;
    epigraph: string;
    chapterNum: number;
    content: string;
  }[];
  updateChapter: (index: number, field: string, value: string | number) => void;
  addNewChapter: () => void;
};
const Chapter = ({ chapters, updateChapter, addNewChapter }: ChapterProps) => {
  return (
    <div className="py-4 max-w-[1000px] mx-auto">
      {chapters.map((chapter, index) => (
        <div key={index} className="flex flex-col gap-4 mb-6 py-6">
          <button type="button">
            Chapter {index + 1}: {truncateWord(chapter.chapterName, 26)}
          </button>
          <input
            type="text"
            value={chapter.chapterName}
            required
            className="p-4 bg-transparent"
            onChange={(e) =>
              updateChapter(index, "chapterName", e.target.value)
            }
            placeholder="Chapter Name"
          />
          <textarea
            value={chapter.epigraph}
            onChange={(e) => updateChapter(index, "epigraph", e.target.value)}
            className="p-2 h-28 bg-transparent"
            placeholder="Epigraph (Optional)"
          />
          <textarea
            value={chapter.content}
            className="p-2 h-screen bg-transparent"
            required
            onChange={(e) => updateChapter(index, "content", e.target.value)}
            placeholder="Content"
          />
        </div>
      ))}
      <button type="button" onClick={addNewChapter}>
        New Chapter +
      </button>
    </div>
  );
};

export default Chapter;
