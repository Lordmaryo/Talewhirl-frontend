"use client";
import React, { useState } from "react";
import BookDetails from "../components/BookDetails";
import Chapter from "../components/Chapter";
import axios from "axios";
import { baseApi } from "../api/baseApi";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { SavedBookResponse } from "../api/ApiServices";
import "react-toastify/dist/ReactToastify.css";

const CreatePage = () => {
  const router = useRouter();
  const [activeTabs, setActiveTabs] = useState<string>("Book details");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [pgRating, setPgRating] = useState(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [chapters, setChapters] = useState([
    { chapterName: "", epigraph: "", chapterNum: 1, content: "" },
  ]);
  const addNewChapter = () => {
    setChapters([
      ...chapters,
      {
        chapterName: "",
        epigraph: "",
        chapterNum: chapters.length + 1,
        content: "",
      },
    ]);
  };

  const updateChapter = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedChapter = chapters.map((chapter, i) =>
      i === index ? { ...chapter, [field]: value } : chapter
    );

    setChapters(updatedChapter);
  };

  const renderContents = () => {
    switch (activeTabs) {
      case "Book details":
        return (
          <BookDetails
            setTitle={setTitle}
            setSynopsis={setSynopsis}
            setPgRating={setPgRating}
            setGenres={setGenres}
            setActiveTabs={setActiveTabs}
            title={title}
            synopsis={synopsis}
            genres={genres}
            pgRating={pgRating}
          />
        );
      case "Story":
        return (
          <Chapter
            chapters={chapters}
            updateChapter={updateChapter}
            addNewChapter={addNewChapter}
          />
        );
      default:
        return;
    }
  };

  let bookId = 0;
  const saveBook = async () => {
    try {
      const { data } = await baseApi.post("book", {
        title,
        synopsis,
        pgRating,
        genres,
        chapters,
      });
      bookId = data.id;
    } catch (err: any) {
      console.error("Error response:", err.response?.data);
      if (axios.isAxiosError(err) && err.response) {
        const errorMsg =
          err.response.data.validationErrors || "An error occurred";
        toast.error(errorMsg);
      } else {
        toast.error("Something went wrong, try again later");
      }
    }
  };

  const handleCancel = () => {
    saveBook();
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveBook();
    if (bookId) router.push(`/create/${bookId}/uploadCovers`);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
      />
      <form className="py-20 px-4" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between items-center sticky top-16 backdrop-blur-md">
          <h1 className="text-xl font-bold ">Create</h1>
          <div className="flex flex-row items-center gap-4 text-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="border border-zinc-600 p-2 rounded-lg font-bold hover:bg-[#ffffff12] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="font-bold bg-green-700 py-2 px-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Finnish
            </button>
          </div>
        </div>
        <div className="pt-5 flex justify-between max-w-[600px] mx-auto px-2">
          <button
            onClick={() => setActiveTabs("Book details")}
            type="button"
            className={`hover:font-bold transition-all w-1/2 text-center py-2 ${
              activeTabs === "Book details" ? "active" : ""
            }`}
          >
            Book details
          </button>
          <button
            onClick={() => setActiveTabs("Story")}
            type="button"
            className={`hover:font-bold transition-all w-1/2 text-center py-2 ${
              activeTabs === "Story" ? "active" : ""
            }`}
          >
            Story
          </button>
        </div>
        <div>{renderContents()}</div>

        <style jsx>{`
          button.active {
            font-weight: bold;
            border-bottom: 3px solid white;
          }
        `}</style>
      </form>
    </>
  );
};

export default CreatePage;
