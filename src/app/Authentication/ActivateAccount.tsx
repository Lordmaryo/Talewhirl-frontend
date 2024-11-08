"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import VerificationInput from "react-verification-input";
import axios from "axios";
import LoginPage from "../Authentication/LoginPage";
import { baseApi } from "../api/baseApi";

const ActivateAccount = () => {
  const [closePopUp, setClosePopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [openlogin, setOpenLogin] = useState(false);
  const [token, setToken] = useState("");

  const handleComplete = async (token: string) => {
    setErrorMessage("");
    
    try {
      await baseApi.get(`auth/activate-account?token=${token}`);
      setIsActivated(true);
      setTimeout(() => {
        setOpenLogin(!openlogin);
      }, 3000);
    } catch (err) {
      setErrorMessage(
        axios.isAxiosError(err) && err.response
          ? `*${err.response.data.error}` || "*An error occurred"
          : "*Something went wrong"
      );
    }
  };
  useEffect(() => {
    if (!closePopUp) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [closePopUp]);

  if (closePopUp) return null;
  if (openlogin) return <LoginPage />;

  return (
    <>
      <div className="absolute w-full h-full bg-[#00000075] z-20" />
      <div className="z-20 bg-white rounded-md sm:max-w-[420px] w-[86%] md:max-w-[600px] h-[300px] text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
            <p className="text-sm text-zinc-700">
              6-DIGIT token has been sent to your email
            </p>
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
            value={token} // not necesssary just to satisfy eslint
            classNames={{ character: "character" }}
          />
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;
