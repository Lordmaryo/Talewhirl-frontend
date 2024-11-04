import { Chapter } from "../api/ApiServices";
import allGenres from "../data/genres.json";

export const interval = (time: number) => {
  return time > 59 ? `${Math.floor(time / 60)}h` : `${time}m`;
};

export const averageReadTime = (chapter: Chapter[] = []): number => {
  if (!chapter.length) return 0;
  const everyWordLength = chapter
    .map((chap) => chap.content.split(/\s+/).length)
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

export const capitalizeWords = (words: string) => {
  return words.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const findDescriptionByGenre = (genre: string) => {
  const genreDescription = allGenres.genres.find((g) => g.name === genre);
  return genreDescription ? genreDescription.description : "";
};

export const genreDescription = (genre: string) => {
  const capitalized = capitalizeWords(genre.replace(/-/g, " "));
  return findDescriptionByGenre(capitalized);
};

export const timeAgo = (dateString: string | Date): string => {
  const units: { label: string; seconds: number }[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  const diff = Math.floor(
    (new Date().getTime() - new Date(dateString).getTime()) / 1000
  );

  for (const unit of units) {
    const count = Math.floor(diff / unit.seconds);
    if (count > 0) return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

export function formatViews(readCount: number): string {
  if (readCount >= 1_000_000) {
    return (readCount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (readCount >= 1_000) {
    return (readCount / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return readCount.toString();
  }
}
