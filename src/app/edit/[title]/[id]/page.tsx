"use client";
import { Book, fetchBookById, SavedBookResponse } from "@/app/api/ApiServices";
import { baseApi } from "@/app/api/baseApi";
import EditBookDetails from "@/app/components/EditBookDetails";
import EditChapter from "@/app/components/EditChapter";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type EditBookPageProps = {
  params: {
    id: string;
    title: string;
  };
};

const EditBookPage = ({ params }: EditBookPageProps) => {
  const router = useRouter();
  const [activeTabs, setActiveTabs] = useState<string>("Book details");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [pgRating, setPgRating] = useState(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [editableChapters, setEditableChapters] = useState([
    { chapterName: "", epigraph: "", chapterNum: 0, content: "" },
  ]);
  const [sucess, setSucess] = useState(false);
  const [response, setResponse] = useState<SavedBookResponse | null>(null);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBookById(params.id, (fetchedBook) => {
      setBook(fetchedBook);
      setTitle(fetchedBook.title || "");
      setSynopsis(fetchedBook.synopsis || "");
      setPgRating(fetchedBook.pgRating || 0);
      setGenres(fetchedBook.genres || []);
      setEditableChapters(fetchedBook.chapters || []);
    });
  }, [params.id]);

  const addNewChapter = () => {
    setEditableChapters([
      ...editableChapters,
      {
        chapterName: "",
        epigraph: "",
        chapterNum: editableChapters.length + 1,
        content: "",
      },
    ]);
  };

  const updateChapter = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setEditableChapters((prevChapters) =>
      prevChapters.map((chapter, i) =>
        i === index ? { ...chapter, [field]: value } : chapter
      )
    );
  };

  const editBook = async () => {
    try {
      const { data } = await baseApi.put(`book/edit/${params.id}`, {
        title,
        synopsis,
        pgRating,
        genres,
        chapters: editableChapters,
      });
      setResponse(data);
      setSucess(true);
    } catch (err: any) {
      console.error("Error response:", err.response?.data);
      if (axios.isAxiosError(err) && err.response) {
        const errorMsg =
          (err.response.data.validationErrors !== undefined &&
            err.response.data.validationErrors[0]) ||
          "An error occurred";
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    if (sucess) {
      router.push(`/create/${params.id}/uploadCovers`);
    }
  }, [sucess, params.id, router]);

  const handleCancel = async () => {
    await editBook();
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editBook();
  };

  console.log("response id", response?.id);

  const renderContents = () => {
    switch (activeTabs) {
      case "Book details":
        return (
          <EditBookDetails
            setTitle={setTitle}
            setSynopsis={setSynopsis}
            setPgRating={setPgRating}
            setGenres={setGenres}
            setActiveTabs={setActiveTabs}
            title={title}
            synopsis={synopsis}
            genres={genres}
            pgRating={pgRating}
            book={book}
          />
        );
      case "Story":
        return (
          <EditChapter
            chapters={editableChapters}
            updateChapter={updateChapter}
            addNewChapter={addNewChapter}
          />
        );
      default:
        return;
    }
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
          <h1 className="text-xl font-bold ">Edit</h1>
          <div className="flex flex-row items-center gap-4 text-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="border p-2 rounded-lg font-bold hover:bg-[#ffffff12] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="font-bold bg-green-700 py-2 px-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Finish
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

export default EditBookPage;
