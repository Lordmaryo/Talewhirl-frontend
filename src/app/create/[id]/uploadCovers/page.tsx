"use client";
import { publishBook } from "@/app/api/ApiServices";
import { baseApi } from "@/app/api/baseApi";
import Button from "@/app/components/Button";
import ButtonTransparent from "@/app/components/ButtonTransparent";
import { PageProps } from "@/app/details/[id]/page";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadCovers = ({ params }: PageProps) => {
  const router = useRouter();
  const bookId = params.id;
  const [bookCoverFile, setBookCoverFile] = useState<File | null>(null);
  const [backgroundCoverFile, setBackgroundCoverFile] = useState<File | null>(
    null
  );

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundCoverFile(e.target.files[0]);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBookCoverFile(e.target.files[0]);
    }
  };

  const uploadBookCover = async () => {
    if (!bookCoverFile) return;
    const coverData = new FormData();
    coverData.append("file", bookCoverFile);
    try {
      await baseApi.post(`book/cover/${bookId}`, coverData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error("Something went wrong");
        console.error(err.response.data.businessErrorDescription);
        console.error(err.response.data.validationErrors);
      }
    }
  };

  const uploadBookBackground = async () => {
    if (!backgroundCoverFile) return;
    const coverData = new FormData();
    coverData.append("file", backgroundCoverFile);
    try {
      await baseApi.post(`book/background-cover/${bookId}`, coverData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error("Something went wrong");
        console.error(err.response.data.businessErrorDescription);
        console.error(err.response.data.validationErrors);
      }
    }
  };

  const saveAndExit = async () => {
    try {
      await Promise.all([uploadBookCover(), uploadBookBackground()]);
      toast.success("covers saved successfully!");
      router.push("/");
    } catch (error) {
      toast.error("upload failed");
      console.error("Upload error:", error);
    }
  };

  const handlePublishBook = async () => {
    try {
      await Promise.all([uploadBookCover(), uploadBookBackground()]);
      publishBook(bookId);
      toast.success("Uploads completed successfully!");
    } catch (error) {
      toast.error("upload failed");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="py-16">
      <ToastContainer position="top-right" autoClose={10000} hideProgressBar />
      <div className="pt-1 relative">
        <div>
          {backgroundCoverFile ? (
            <Image
              src={URL.createObjectURL(backgroundCoverFile)}
              width={100}
              height={100}
              alt="book background cover"
              className="w-full h-60 object-cover"
            />
          ) : (
            <div className="w-full h-60 border text-center text-zinc-500 pt-20">
              Add a background
            </div>
          )}
          <div>
            <div
              className="absolute top-16 left-1/2 right-1/2 transform
               -translate-x-1/2 -translate-y-1/2 hover:opacity-75 transition-opacity"
              title="upload background"
            >
              <input
                type="file"
                id="background-input"
                className="hidden"
                onChange={handleBackgroundChange}
              />
              <label htmlFor="background-input">
                <IoImageOutline size={35} style={{ cursor: "pointer" }} />
              </label>
            </div>
          </div>
        </div>
        <div>
          {bookCoverFile ? (
            <Image
              src={URL.createObjectURL(bookCoverFile)}
              width={100}
              height={100}
              className="w-40 h-full md:w-44 object-cover rounded-md absolute 
              top-28 sm:left-14 left-6"
              alt="book cover"
            />
          ) : (
            <div
              className="w-40 h-60 border text-center text-zinc-500 pt-20 absolute top-[7rem] 
            left-12 sm:top-[7rem] sm:left-[4rem]"
            >
              Add a cover
            </div>
          )}
          <div>
            <div
              className="absolute top-[8.5rem] left-12 sm:top-[9rem] sm:left-[5.5rem] transition-opacity"
              title="upload profile"
            >
              <input
                type="file"
                id="profile-input"
                className="hidden"
                onChange={handleCoverChange}
              />
              <label htmlFor="profile-input">
                <IoImageOutline size={30} style={{ cursor: "pointer" }} />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-40 flex flex-row gap-4">
        <ButtonTransparent label="Save and exit" onClick={saveAndExit} />
        <Button label="Publish" onClick={handlePublishBook} />
      </div>
    </div>
  );
};

export default UploadCovers;
