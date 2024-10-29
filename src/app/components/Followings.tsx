import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PageProps } from "../details/[id]/page";
import { loadUser, UserResponse } from "../api/ApiServices";
import ListFollowCard from "./ListFollowCard";

const Followings = ({ params }: PageProps) => {
  const userId = params.id;
  const [closePopUp, setClosePopUp] = useState(false);
  const [userData, setUserData] = useState<UserResponse>();

  useEffect(() => {
    loadUser(userId, setUserData);
  }, []);

  if (closePopUp) return null;

  return (
    <div
      className="z-10 bg-[#272727] rounded-md sm:max-w-[400px] w-[80%] 
      md:max-w-[600px] h-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 
      -translate-y-1/2 overflow-y-scroll px-4"
    >
      <div className="bg-inherit w-full sticky top-2 right-0 flex flex-row items-center justify-center px-4">
        <button
          className="absolute right-2 top-3 text-white"
          onClick={() => setClosePopUp(!closePopUp)}
        >
          <IoClose size={25} />
        </button>
        <h2 className="text-center text-white font-bold mt-3">Followings</h2>
      </div>
      <div className="pt-6">
        {userData?.following.map((followId) => {
          return <ListFollowCard followId={followId} />;
        })}
      </div>
    </div>
  );
};

export default Followings;
