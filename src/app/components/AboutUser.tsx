"use client";
import React, { useEffect, useState } from "react";
import { loadUser, UserResponse } from "../api/ApiServices";

type AboutUserProps = {
  userId: string;
};
const AboutUser = ({ userId }: AboutUserProps) => {
  const [userData, setUserData] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (userId) loadUser(userId, setUserData);
  }, [userId]);

  return (
    <div className="px-4 min-h-screen pb-10 pt-4">
      <p>{userData?.about}</p>
    </div>
  );
};

export default AboutUser;
