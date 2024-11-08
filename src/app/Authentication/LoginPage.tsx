"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import loginBg3 from "../image/login-bg3.jpg";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import SignUpPage from "../Authentication/SignUpPage";
import { getToken, setToken } from "../token/Token";
import { baseApi } from "../api/baseApi";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errormessage, setErrorMessage] = useState<string>("");
  const [closePopUp, setClosePopUp] = useState<boolean>(false);
  const [registerPage, setRegisterPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); 
    setIsLoading(true);
    try {
      const response = await baseApi.post("auth/Authenticate", {
        email,
        password,
      });
      setToken(response.data.token);
      console.log(getToken());
      location.reload();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(
          err.response.data.businessErrorDescription ||
            err.response.data.validationErrors ||
            "error occured"
        );
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setIsLoading(false);
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

  const handleDemoLogin = () => {
    setEmail("johndoe@mail.com");
    setPassword("password");
  };

  if (closePopUp) return null;
  if (registerPage) return <SignUpPage />;
  return (
    <>
      <div
        className="z-10 fixed w-full h-full overflow-hidden bg-[#000000a4]"
        onClick={() => setClosePopUp(!closePopUp)}
      />
      <div
        className="z-10 backdrop-blur-md flex flex-row bg-white rounded-md 
      sm:max-w-[400px] w-[80%] md:max-w-[620px] h-[400px] text-black fixed 
      top-1/2 left-1/2 transform -translate-x-1/2
       -translate-y-1/2"
      >
        <Image
          src={loginBg3}
          className="hidden md:block object-cover rounded-l-md"
          width={400}
          priority={true}
          alt=""
        ></Image>
        <div className="relative p-4 mx-auto text-center">
          <button
            className="absolute right-2 top-3"
            onClick={() => setClosePopUp(!closePopUp)}
          >
            <IoClose size={20} />
          </button>
          <h2 className="text-center text-[#256325] font-bold text-xl lg:text-3xl">
            Welcome back!
          </h2>
          <p className="text-center mb-4 text-sm">
            TaleWhirl - a better place to read fantasy book online for free!
          </p>
          <form onSubmit={handleLogin}>
            {errormessage && (
              <div className="w-full text-sm text-red-500 py-1">
                <span>*{errormessage}</span>
              </div>
            )}
            <div className="relative">
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none py-1 pl-2 pr-8 border border-zinc-500 w-full"
              />
              <IoMdMail
                size={16}
                className="text-[#256325] absolute right-2 top-1.5"
              />
            </div>
            <div className="relative mt-5">
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none py-1 pl-2 pr-8 border border-zinc-500 w-full"
              />
              <FaLock
                size={16}
                className="text-[#256325] absolute right-2 top-1.5"
              />
            </div>

            <div className="flex flex-row justify-between mt-5">
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="remember"
                  value="yes"
                  className="border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-[#256325]"
                onClick={handleDemoLogin}
              >
                Demo Login
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#256325] mt-5 text-white hover:bg-[#2f7f2f] transition-colors rounded-md"
            >
              Login
            </button>
            <div className="mt-5 space-x-2 pb-6">
              <span>Don't have an account?</span>
              <button
                className="text-[#256325]"
                onClick={() => setRegisterPage(!registerPage)}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
