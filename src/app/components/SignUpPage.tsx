import { useRouter } from "next/navigation";
import React, { useState } from "react";
import baseApi from "../api/baseApi";
import axios from "axios";
import LoginPage from "./LoginPage";
import Image from "next/image";
import signUpBg from "../image/signup-bg.jpg";
import { IoClose } from "react-icons/io5";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import CountrySelector from "../utilities/CountrySelector";

const SignUpPage = () => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [errormessage, setErrorMessage] = useState<string[]>([]);
  const [closePopUp, setClosePopUp] = useState<boolean>(false);
  const [loginPage, setLoginPage] = useState<boolean>(false);
  const router = useRouter();

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage([]);

    const requestData = {
      firstName: capitalizeName(firstname),
      lastName: capitalizeName(lastname),
      email,
      dateOfBirth: dob,
      password,
      country: selectedCountry,
    };

    try {
      const response = await baseApi.post("auth/register", requestData);
      // router.push("/welcome");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(
          err.response.data.validationErrors || ["An error occurred"]
        );
      } else {
        setErrorMessage(["Something went wrong"]);
      }
    }
  };

  if (closePopUp) return null;
  if (loginPage) return <LoginPage />;

  return (
    <>
      <div
        className="absolute w-full h-full bg-[#00000075]"
        onClick={() => setClosePopUp(!closePopUp)}
      />
      <div className="flex flex-row bg-white rounded-md sm:max-w-[420px] w-[86%] md:max-w-[680px] h-[580px] text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src={signUpBg}
          className="hidden md:block object-cover rounded-l-md"
          width={400}
          alt="Signup background"
        />
        <div className="relative p-4 mx-auto text-center">
          <button
            className="absolute right-2 top-3"
            onClick={() => setClosePopUp(!closePopUp)}
          >
            <IoClose size={20} />
          </button>
          <h2 className="text-center text-[#256325] font-bold text-xl lg:text-3xl">
            Register
          </h2>
          <p className="text-center mb-6">
            When becoming members of the site, you could use the full range of
            functions!
          </p>
          <form onSubmit={handleSignUp}>
            {errormessage.length > 0 && (
              <ul className="text-left pl-2 w-full text-sm bg-red-500 text-white py-1 rounded-t-md">
                {errormessage.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            )}
            <div className="flex gap-x-4">
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="Firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-transparent outline-none py-1 pl-2 pr-8 border border-zinc-500 w-full"
                />
                <IoMdPerson
                  size={16}
                  className="text-[#256325] absolute right-2 top-1.5"
                />
              </div>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="Lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-transparent outline-none py-1 pl-2 pr-8 border border-zinc-500 w-full"
                />
                <IoMdPerson
                  size={16}
                  className="text-[#256325] absolute right-2 top-1.5"
                />
              </div>
            </div>
            <div className="relative mt-5">
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
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none py-1 pl-2 pr-8 border border-zinc-500 w-full"
              />
              <FaLock
                size={16}
                className="text-[#256325] absolute right-2 top-1.5"
              />
            </div>
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
            <div className="flex flex-col gap-y-2 mt-5">
              <label
                htmlFor="dob"
                className="text-sm text-left text-[#0000008d]"
              >
                Your birthday
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                id="dob"
                className="border border-gray-300 rounded-md px-4 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#256325] mt-5 text-white hover:bg-[#2f7f2f] transition-colors rounded-md"
            >
              Create an account
            </button>
            <div className="mt-5 space-x-2 pb-6">
              <span>Already have an account?</span>
              <button
                className="text-[#256325]"
                onClick={() => setLoginPage(!loginPage)}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
