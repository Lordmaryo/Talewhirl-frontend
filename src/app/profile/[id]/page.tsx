"use client";
import { PageProps } from "@/app/details/[id]/page";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import profile from "../../image/default-profile.png";
import backgroundPic from "../../image/bg-cover.jpg";
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

const Page = ({ params }: PageProps) => {
  const userId = params.id;
  const [userData, setUserData] = useState<UserResponse>();
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowings, setOpenFollowings] = useState(false);
  const [tokenData, setTokenData] = useState<TokenDataProps | null>(null);
  const [followStatus, setFollowStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  /**
   * published
   * drafts
   * about
   */
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

  if (!userData) return <Spinner />;

  return (
    <>
      <div className="pt-16 relative">
        <Image
          src={backgroundPic}
          alt="profile picture"
          className="w-full max-h-36 object-cover"
        />
        <Image
          src={profile}
          className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full absolute top-40 sm:left-14 left-6"
          alt="profile picture"
        />
        <div className="absolute sm:top-[17rem] top-[15rem] px-4 flex flex-col pl-4 md:pl-10">
          <span className="font-bold">
            {userData?.firstname + " " + userData?.lastname}
          </span>
          <span className="opacity-50">
            @{userData.generatedUsername || userData?.firstname}
          </span>
          <span className="pt-3">{userData.bio || "No bio yet"}</span>
          <span className="opacity-50">
            Joined {formatDate(userData.createdDate)}
          </span>
        </div>
        <div className="pt-4 absolute lg:w-[78%] md:w-[70%] sm:w-[65%] top-52 right-2 flex justify-between items-center">
          <div className="hidden sm:flex flex-row gap-x-20 lg:gap-36 items-center">
            <button onClick={() => setOpenFollowings(!openFollowings)}>
              <span className="pr-1">{userData.following.length}</span>
              <span>Followings</span>
            </button>
            <button onClick={() => setOpenFollowers(!openFollowers)}>
              <span className="pr-1">{userData.followers.length}</span>
              <span>Followers</span>
            </button>
          </div>
          {currentUserId == userId ? (
            <ButtonTransparent label="Edit profile" className="lg:mr-10 mx-4" />
          ) : (
            <ButtonTransparent
              disabled={!isAuthenticated}
              className="lg:mr-10 mx-4"
              label={followStatus}
              onClick={handleFollowToggle}
            />
          )}
        </div>
        <div className="pl-4 md:pl-10 absolute top-[22rem] flex sm:hidden flex-row gap-x-6 items-center">
          <button className="" onClick={() => setOpenFollowers(!openFollowers)}>
            <span className="pr-1">{userData.followers.length}</span>
            <span>Followers</span>
          </button>
          <button
            className=""
            onClick={() => setOpenFollowings(!openFollowings)}
          >
            <span className="pr-1">{userData.following.length}</span>
            <span>Followings</span>
          </button>
        </div>
      </div>
      {openFollowers && <Followers params={params} />}
      {openFollowings && <Followings params={params} />}
    </>
  );
};

export default Page;
