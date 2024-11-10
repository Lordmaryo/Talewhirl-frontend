import React from "react";

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

const EditChapter = ({
  chapters,
  updateChapter,
  addNewChapter,
}: ChapterProps) => {
  return (
    <div className="py-4 max-w-[1000px] mx-auto">
      {chapters.map((chapter, index) => (
        <div key={index} className="flex flex-col gap-4 mb-6 py-6">
          <button type="button">
            Chapter {index + 1}: {chapter.chapterName}
          </button>

          <input
            type="text"
            value={chapter.chapterName}
            onChange={(e) =>
              updateChapter(index, "chapterName", e.target.value)
            }
            placeholder="Chapter Name"
            className="p-4 bg-transparent"
          />
          <textarea
            value={chapter.epigraph}
            onChange={(e) => updateChapter(index, "epigraph", e.target.value)}
            placeholder="Epigraph (Optional)"
            className="p-2 h-28 bg-transparent"
          />
          <textarea
            value={chapter.content}
            onChange={(e) => updateChapter(index, "content", e.target.value)}
            placeholder="Content"
            className="p-2 h-screen bg-transparent"
          />
        </div>
      ))}
      <button type="button" onClick={addNewChapter}>
        New Chapter +
      </button>
    </div>
  );
};

export default EditChapter;
