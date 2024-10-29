import { Chapter } from "../api/ApiServices";

export const interval = (time: number) => {
  return time > 59 ? `${Math.floor(time / 60)}h` : `${time}m`;
};

export const averageReadTime = (chapter: Chapter[]): number => {
  const everyWordLength = chapter
    .map((chapter) => chapter.content.split(/\s+/).length)
    .reduce((a, b) => a + b, 0);
  const averageWpm = 200;

  return Math.ceil(everyWordLength / averageWpm);
};

export const truncateWord = (word: string | null, maxLength: number) => {
  if (!word) return word;

  const numOfWords = word.length;
  return numOfWords > maxLength ? word.slice(0, maxLength) + "..." : word;
};
