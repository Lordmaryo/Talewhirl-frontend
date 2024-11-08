"use client";
import { PageProps } from "@/app/details/[id]/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import defaultProfile from "../../image/default-profile.png";
import defaultbg from "../../image/darkbackground.jpg";
import { loadUser, UserResponse } from "@/app/api/ApiServices";
import Spinner from "@/app/loaders/Spinner";
import { formatDate } from "@/app/utilities/FormatDate";
import Followers from "@/app/components/Followers";
import Followings from "@/app/components/Followings";
import ButtonTransparent from "@/app/components/ButtonTransparent";
import checkAuthAndSetToken, {
  getToken,
  TokenDataProps,
} from "@/app/token/Token";
import { baseApi } from "@/app/api/baseApi";
import EditProfile from "@/app/components/EditProfile";
import ProfileNavigation from "@/app/components/ProfileNavigation";
/*
 *sucess useState hook was accessed through a child being
  editProfile and it checks if edit was sucessfull 
 */
const Profile = ({ params }: PageProps) => {
  const userId = params.id;
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowings, setOpenFollowings] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tokenData, setTokenData] = useState<TokenDataProps | null>(null);
  const [followStatus, setFollowStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [success, setSucess] = useState(false);
  const currentUserId: any = tokenData?.id;

  useEffect(() => {
    checkAuthAndSetToken(getToken, setIsAuthenticated, setTokenData);
  }, []);

  const loadUserData = useCallback(() => {
    loadUser(userId, (data: UserResponse) => {
      setUserData(data);
      setFollowStatus(
        data.followers.includes(currentUserId) ? "Unfollow" : "Follow"
      );
    });
  }, [userId, currentUserId]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleFollowToggle = async () => {
    if (followStatus === "Unfollow") {
      await baseApi.post(`user/${currentUserId}/unfollow/${userId}`);
      setFollowStatus("Follow");
    } else {
      await baseApi.post(`user/${currentUserId}/follow/${userId}`);
      setFollowStatus("Unfollow");
    }
    loadUserData();
  };

  const handleAction = (
    setAction: (action: boolean) => void,
    action: boolean
  ): void => {
    if (!isAuthenticated) {
      toast.dismiss();
      notify();
    } else {
      setAction(!action);
    }
  };

  useEffect(() => {
    if (success) {
      toast.dismiss();
      editSucessfull();
    }
  }, [success]);

  const notify = () =>
    toast.error("You need to have an account to complete this action");
  const editSucessfull = () => toast.success("Profile edited sucessfully");
  if (!userData) return <Spinner />;
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="pt-16 relative">
        <Image
          src={
            !userData.backgroundPic
              ? defaultbg
              : `data:image/jpeg;base64,${userData?.backgroundPic}`
          }
          width={100}
          height={100}
          alt=""
          className="w-full max-h-36 object-cover"
        />
        <Image
          src={
            !userData.profilePic
              ? defaultProfile
              : `data:image/jpeg;base64,${userData?.profilePic}`
          }
          width={100}
          height={100}
          className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full absolute top-40 sm:left-14 left-6"
          alt=""
        />
        <div className="absolute sm:top-[17rem] top-[15rem] px-4 flex flex-col pl-4 md:pl-10">
          <span className="font-bold">
            {userData?.firstname + " " + userData?.lastname}
          </span>
          <span className="opacity-50">
            @{userData.generatedUsername}
          </span>
          <span className="pt-3">{userData.bio || "No bio yet"}</span>
          <span className="opacity-50 py-2">
            Joined {formatDate(userData.createdDate)}
          </span>
        </div>
        <div className="pt-4 absolute lg:w-[78%] md:w-[70%] sm:w-[65%] top-52 right-2 flex justify-between items-center">
          <div className="hidden sm:flex flex-row gap-x-20 lg:gap-36 items-center">
            <button
              onClick={() => handleAction(setOpenFollowings, openFollowings)}
            >
              <span className="pr-1 font-bold">
                {userData.following.length}
              </span>
              <span className="text-zinc-400">Followings</span>
            </button>
            <button
              onClick={() => handleAction(setOpenFollowers, openFollowers)}
            >
              <span className="pr-1 font-bold">
                {userData.followers.length}
              </span>
              <span className="text-zinc-400">Followers</span>
            </button>
          </div>
          {currentUserId == userId ? (
            <ButtonTransparent
              onClick={() => setOpenEdit(!openEdit)}
              label="Edit profile"
              className="lg:mr-10 mx-4 sm:mx-2 md:mx-4"
            />
          ) : (
            <ButtonTransparent
              disabled={!isAuthenticated}
              className="lg:mr-10 mx-4"
              label={followStatus}
              onClick={handleFollowToggle}
            />
          )}
        </div>
        <div className="pl-4 md:pl-10 pt-44 flex sm:hidden flex-row gap-x-6 items-center">
          <button onClick={() => handleAction(setOpenFollowers, openFollowers)}>
            <span className="pr-1">{userData.followers.length}</span>
            <span>Followers</span>
          </button>
          <button
            onClick={() => handleAction(setOpenFollowings, openFollowings)}
          >
            <span className="pr-1">{userData.following.length}</span>
            <span>Followings</span>
          </button>
        </div>
        <ProfileNavigation userId={userId} currentUserId={currentUserId} />
      </div>
      {openFollowers && <Followers params={params} />}
      {openFollowings && <Followings params={params} />}
      {openEdit && (
        <EditProfile setSucess={setSucess} currentUserId={currentUserId} />
      )}
    </>
  );
};

export default Profile;
