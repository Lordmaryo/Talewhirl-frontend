"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoMenu, IoSearch } from "react-icons/io5";
import Logo from "./image/TaleWhirlFox-removebg.png";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Button } from "@radix-ui/themes";
import LoginPage from "./LoginPage";

const Header = () => {
  const [toggleSearchButton, setToggleSearchButton] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [isLoginClicked, setIsLoginCliked] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInput("");
    router.push(`/search/${input}`);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between py-5 px-3 fixed top-0 right-0 left-0">
        <div className="flex items-center justify-between gap-5">
          <div>
            <IoMenu size={30} />
          </div>
          <Link href="/">
            {/* <Image src={Logo} alt="talewhirl logo"></Image> */}
            <span className="sigmar-regular">TALEWHIRL</span>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="hidden sm:flex items-center mx-3 border border-[#413f3f] rounded-md p-2"
          >
            {!toggleSearchButton && (
              <span className="h-5 w-5 text-black dark:text-gray-500">
                <CiSearch size={20} />
              </span>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="sm:w-[300px] md:w-[400px] lg:w-[500px] pl-2 outline-none bg-transparent dark:placeholder:text-gray-50 placeholder:text-zinc-800"
              placeholder="Search any title"
            />
          </form>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setToggleSearchButton(!toggleSearchButton)}
            className="inline sm:hidden text-gray-400"
          >
            {toggleSearchButton ? (
              <IoMdClose size={30} />
            ) : (
              <IoSearch size={30} />
            )}
          </button>
          {/* <p className="xl:block hidden">Welcome Ebube!</p> */}
          {/* this line should only be when you've logged in*/}
          <Button
            onClick={() => setIsLoginCliked(!isLoginClicked)}
            className="bg-green-800 hover:bg-green-700 transition-colors px-5 py-2 rounded md:flex hidden flex-row items-center gap-2"
          >
            Login
          </Button>
          <Button className="hover:bg-[#262626] border transition-colors px-5 py-2 rounded md:flex hidden flex-row items-center gap-2">
            Sign up
          </Button>
          <button>
            <MdOutlineAccountCircle className="block md:hidden" size={30} />
          </button>
        </div>
      </div>

      {toggleSearchButton && (
        <form
          onSubmit={handleSubmit}
          className="sm:hidden absolute max-w-[640px] top-16 left-0 right-0 flex items-center mx-3 border border-[#413f3f] rounded-md p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full pl-2 outline-none bg-transparent dark:placeholder:text-gray-50 placeholder:text-zinc-800"
            placeholder="Search any title"
          />
        </form>
      )}
      {isLoginClicked && <LoginPage />}
    </>
  );
};

export default Header;
