import React, { useEffect, useState } from "react";
import { UserResponse } from "../api/ApiServices";
import { baseApi } from "../api/baseApi";
import axios from "axios";
import Button from "./Button";

type EditProfileFormProps = {
  uploadProfile: () => Promise<void>;
  uploadBackground: () => Promise<void>;
  currentUserId: number | undefined;
  userData: UserResponse;
  setSucess: (sucess: boolean) => void;
};

const EditProfileForm = ({
  uploadProfile,
  uploadBackground,
  currentUserId,
  userData,
  setSucess,
}: EditProfileFormProps) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstname(userData.firstname || firstName);
    setLastname(userData.lastname || lastName);
    setUsername(userData.generatedUsername || username);
    setBio(userData.bio || bio);
  }, [userData]);

  console.log("error message from edit form", errormessage);

  const handleForm = async () => {
    console.log("user id inside handle form", currentUserId);
    setErrorMessage("");
    try {
      await baseApi.patch(`user/edit_account/${currentUserId}`, {
        firstName,
        lastName,
        generatedUsername: username,
        bio,
      });
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(
          err.response.data.businessErrorDescription ||
            err.response.data.validationErrors ||
            "error occured"
        );
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  const handleAllEdit = async () => {
    setLoading(true);
    try {
      await uploadProfile();
      await uploadBackground();
      await handleForm();
      setSucess(true);
    } catch (error) {
      console.error("error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 px-4">
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
            rounded-md h-8 outline-none px-2"
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
            rounded-md h-8 outline-none px-2"
            id="lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastName}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full py-4">
        <label className=" text-sm opacity-75" htmlFor="lastname">
          Username
        </label>
        <input
          required
          type="text"
          className="bg-transparent border border-zinc-500 
            rounded-md h-8 outline-none px-2"
          id="lastname"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="flex flex-col gap-2 w-full py-4">
        <label className=" text-sm opacity-75" htmlFor="lastname">
          Bio
        </label>
        <textarea
          required
          className="bg-transparent border border-zinc-500 
            rounded-md outline-none px-2 h-24 resize-none"
          id="lastname"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </div>
      <Button
        disabled={loading}
        type="submit"
        label="Save Changes"
        onClick={handleAllEdit}
      />
    </div>
  );
};

export default EditProfileForm;
