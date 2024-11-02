import React, { useEffect, useState } from "react";
import { loadUser, UserResponse } from "../api/ApiServices";
import Link from "next/link";
import Image from "next/image";
import defaultProfile from "../image/default-profile.png";

export type FollowIdProp = {
  followId: number;
};

const ListFollowCard = ({ followId }: FollowIdProp) => {
  const [userData, setUserData] = useState<UserResponse | null>(null);
  useEffect(() => {
    if (followId) loadUser(followId, setUserData);
  }, [followId]);

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex flex-row gap-x-2">
        <Image
          src={
            !userData?.profilePic
              ? defaultProfile
              : `data:image/jpeg;base64,${userData?.profilePic}`
          }
          className="w-10 h-10 rounded-full"
          alt="profile picture"
          width={100}
          height={100}
        />
        <div className="flex flex-col">
          <span className="text-sm">
            {userData?.username || userData?.firstname}
            {/* change to generatedUsername */}
          </span>
          <span className="text-xs opacity-50">
            {userData?.firstname + " " + userData?.lastname}
          </span>
        </div>
      </div>
      <Link
        className="hover:bg-[#ffffff08] border border-zinc-500 py-1 px-2 rounded-md ml-2"
        href={`/profile/${userData?.id}`}
      >
        View Profile
      </Link>
    </div>
  );
};

export default ListFollowCard;
