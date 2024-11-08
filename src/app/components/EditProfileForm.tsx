import React, { useEffect, useState } from "react";
import { UserResponse } from "../api/ApiServices";
import { baseApi } from "../api/baseApi";
import axios from "axios";
import Button from "./Button";
import { capitalizeName } from "../utilities/Helpers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type EditProfileFormProps = {
  uploadProfile: () => Promise<void>;
  uploadBackground: () => Promise<void>;
  currentUserId: number | undefined;
  userData: UserResponse;
  setSucess: (sucess: boolean) => void;
  setClose: (sucess: boolean) => void;
};

const EditProfileForm = ({
  uploadProfile,
  uploadBackground,
  currentUserId,
  userData,
  setSucess,
  setClose,
}: EditProfileFormProps) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [errormessage, setErrorMessage] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstname(userData.firstname || firstName);
    setLastname(userData.lastname || lastName);
    setUsername(userData.generatedUsername || username);
    setAbout(userData.about || about);
    setBio(userData.bio || bio);
  }, [userData]);

  const handleForm = async (): Promise<boolean> => {
    setErrorMessage([]);
    try {
      await baseApi.patch(`user/edit_account/${currentUserId}`, {
        firstName: capitalizeName(firstName),
        lastName: capitalizeName(lastName),
        generatedUsername: username,
        about,
        bio,
      });
      return true;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(
          err.response.data.businessErrorDescription ||
            err.response.data.validationErrors || ["An error occurred"]
        );
      } else {
        setErrorMessage(["Something went wrong"]);
      }
      return false;
    }
  };

  const handleAllEdit = async () => {
    setLoading(true);
    try {
      if (await handleForm()) {
        await uploadProfile();
        await uploadBackground();
        setClose(true);
        setSucess(true); // this displays toast notification in the parent component
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="mt-20 px-4" onSubmit={handleAllEdit}>
        {errormessage.length > 0 && (
          <ul className="py-2 rounded-md px-4 bg-red-500 text-white mb-2">
            {errormessage.map((e, index) => (
              <li className="py-1" key={index}>
                {e}
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center flex-wrap sm:flex-nowrap items-center gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className=" text-sm opacity-75" htmlFor="firstname">
              Firstname
            </label>
            <input
              required
              type="text"
              id="firstname"
              className="bg-transparent border border-zinc-500 
            rounded-md h-8 outline-none px-2 py-4"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className=" text-sm opacity-75" htmlFor="lastname">
              Lastname
            </label>
            <input
              required
              type="text"
              className="bg-transparent border border-zinc-500 
            rounded-md h-8 outline-none px-2 py-4"
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastName}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full py-4">
          <label className=" text-sm opacity-75" htmlFor="username">
            Username
          </label>
          <input
            required
            type="text"
            className="bg-transparent border border-zinc-500 
            rounded-md h-8 outline-none px-2 py-4"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="flex flex-col gap-2 w-full py-4">
          <label className=" text-sm opacity-75" htmlFor="bio">
            Bio
          </label>
          <textarea
            required
            className="bg-transparent border border-zinc-500 
            rounded-md outline-none px-2 py-2 h-24 resize-none"
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div className="flex flex-col gap-2 w-full py-4">
          <label className=" text-sm opacity-75" htmlFor="about">
            About
          </label>
          <textarea
            required
            className="bg-transparent border border-zinc-500 
            rounded-md outline-none px-2 py-2 h-24 resize-none"
            id="about"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </div>
        <Button
          disabled={loading}
          type="submit"
          label="Save Changes"
          onClick={handleAllEdit}
        />
      </div>
    </>
  );
};

export default EditProfileForm;
