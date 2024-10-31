import { Chapter } from "../api/ApiServices";

export const interval = (time: number) => {
  return time > 59 ? `${Math.floor(time / 60)}h` : `${time}m`; // time it takes to read a boom
};

export const averageReadTime = (chapter: Chapter[] = []): number => {
  if (!chapter.length) return 0;
  const everyWordLength = chapter
    .map((ch) => ch.content.split(/\s+/).length)
    .reduce((a, b) => a + b, 0);
  const averageWpm = 200;
  return Math.ceil(everyWordLength / averageWpm);
};

export const truncateWord = (word: string | null, maxLength: number) => {
  if (!word) return word;

  const numOfWords = word.length;
  return numOfWords > maxLength ? word.slice(0, maxLength) + "..." : word;
};

export const capitalizeName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
