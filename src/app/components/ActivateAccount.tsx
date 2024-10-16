"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import VerificationInput from "react-verification-input";
import baseApi from "../api/baseApi";
import axios from "axios";
import LoginPage from "./LoginPage";

const ActivateAccount = () => {
  const [closePopUp, setClosePopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [openlogin, setOpenLogin] = useState(false);
  const [_, setToken] = useState("");

  const handleComplete = async (token: string) => {
    setErrorMessage("");
    try {
      await baseApi.get(`auth/activate-account?token=${token}`);
      setIsActivated(true);
      setTimeout(() => {
        setOpenLogin(!openlogin);
      }, 3000);
    } catch (err: any) {
      setErrorMessage(
        axios.isAxiosError(err) && err.response
          ? `*${err.response.data.error}` || "*An error occurred"
          : "*Something went wrong"
      );
    }
  };

  if (closePopUp) return null;
  if (openlogin) return <LoginPage />;

  return (
    <>
      <div className="absolute w-full h-full bg-[#00000075]" />
      <div className="bg-white rounded-md sm:max-w-[420px] w-[86%] md:max-w-[600px] h-[300px] text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          className="absolute right-2 top-3"
          onClick={() => setClosePopUp(true)}
        >
          <IoClose size={20} />
        </button>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center space-y-1 mb-2">
            <h1 className="text-zinc-800 font-bold text-xl lg:text-3xl">
              Input activation code
            </h1>
            {isActivated ? (
              <p className="text-sm text-green-700">
                Success! You will be redirected to login in 3s.
              </p>
            ) : (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
          <VerificationInput
            validChars="0-9"
            onComplete={handleComplete}
            inputProps={{ autoComplete: "one-time-code" }}
            onChange={setToken}
            classNames={{ character: "character" }}
          />
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;
