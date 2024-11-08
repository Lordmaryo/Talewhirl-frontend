"use client";
import React, { useEffect, useState } from "react";
import defaultProfile from "../image/default-profile.png";
import defaultbg from "../image/darkbackground.jpg";
import { baseApi } from "../api/baseApi";
import Image from "next/image";
import { loadUser, UserResponse } from "../api/ApiServices";
import Spinner from "../loaders/Spinner";
import { IoImageOutline } from "react-icons/io5";
import EditProfileForm from "./EditProfileForm";
import axios from "axios";

type CurrentUserIdProp = {
  currentUserId: number | undefined;
  setSucess: (sucess: boolean) => void;
};

const EditProfile = ({ currentUserId, setSucess }: CurrentUserIdProp) => {
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const handleprofileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
    }
  };
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    loadUser(currentUserId, setUserData);
  }, [currentUserId]);

  const uploadProfile = async () => {
    if (!profileFile) return;
    const profileData = new FormData();
    profileData.append("file", profileFile);
    try {
      await baseApi.post("user/profile_pic", profileData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.businessErrorDescription);
        console.error(err.response.data.validationErrors);
      }
    }
  };
  const uploadBackground = async () => {
    if (!backgroundFile) return;
    const backgroundData = new FormData();
    backgroundData.append("file", backgroundFile);

    try {
      await baseApi.post("user/background_pic", backgroundData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.businessErrorDescription);
        console.error(err.response.data.validationErrors);
      }
    }
  }; 

  const [close, setClose] = useState(false);

  if (!userData) return <Spinner />;
  if (close) return null;
  return (
    <div
      className="z-10 bg-[#272727] rounded-md sm:max-w-[600px] 
        sm:h-[500px] md:max-w-[620px] md:h-[500px] w-full h-full fixed 
        top-1/2 left-1/2 transform -translate-x-1/2
        -translate-y-1/2 overflow-y-scroll pb-4"
    >
      <div className="flex flex-row justify-between items-center mt-4 mx-2 bg-inherit sticky">
        <button
          onClick={() => setClose(!close)}
          className="font-bold py-1 px-2 rounded-lg hover:bg-[#ffffff10] transition-colors"
        >
          Cancel
        </button>
        <h2 className="font-bold text-xl">Edit profile</h2>
      </div>
      <div className="pt-1 relative">
        <div>
          <Image
            src={
              backgroundFile
                ? URL.createObjectURL(backgroundFile)
                : !userData.backgroundPic
                ? defaultbg
                : `data:image/jpeg;base64,${userData?.backgroundPic}`
            }
            width={100}
            height={100}
            alt=""
            className="w-full max-h-36 object-cover"
          />
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
          <Image
            src={
              profileFile
                ? URL.createObjectURL(profileFile)
                : !userData.profilePic
                ? defaultProfile
                : `data:image/jpeg;base64,${userData?.profilePic}`
            }
            width={100}
            height={100}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full absolute 
            top-28 sm:left-14 left-6"
            alt="profile picture"
          />
          <div>
            <div
              className="absolute top-[8.5rem] left-12 sm:top-[9rem] sm:left-[5.5rem] transition-opacity"
              title="upload profile"
            >
              <input
                type="file"
                id="profile-input"
                className="hidden"
                onChange={handleprofileChange}
              />
              <label htmlFor="profile-input">
                <IoImageOutline size={30} style={{ cursor: "pointer" }} />
              </label>
            </div>
          </div>
        </div>
      </div>
      <EditProfileForm
        uploadProfile={uploadProfile}
        uploadBackground={uploadBackground}
        currentUserId={currentUserId}
        userData={userData}
        setClose={setClose}
        setSucess={setSucess}
      />
    </div>
  );
};

export default EditProfile;
