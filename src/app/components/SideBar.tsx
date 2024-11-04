import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import GenresMenu from "./GenresMenu";
import { IoIosLogOut } from "react-icons/io";
import { checkAuthenication, removeToken } from "../token/Token";

type SideBarProps = {
  setToggleMenu: (toggleMenu: boolean) => void;
  currentUserId: number | undefined;
};

const SideBar = ({ setToggleMenu, currentUserId }: SideBarProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthenication(setIsAuthenticated);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-20">
      <div className="scrollbar-hide bg-[#272727] w-[300px] h-screen overflow-y-auto scroll pt-4">
        <button
          onClick={() => setToggleMenu(false)}
          className="ml-4 bg-[#383838] flex flex-row py-2 px-4 rounded-lg items-center gap-2 justify-center"
        >
          <FaChevronLeft />
          <span className="font-bold">Close menu</span>
        </button>
        <div className="py-4">
          <ul className="flex flex-col gap-y-4">
            <Link
              onClick={() => setToggleMenu(false)}
              href={"/"}
              className="hover:bg-[#383838] py-2 px-4"
            >
              <li>Home</li>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  onClick={() => setToggleMenu(false)}
                  href={"/profile/" + currentUserId}
                  className="hover:bg-[#383838] py-2 px-4"
                >
                  <li>Profile</li>
                </Link>
                <Link
                  onClick={() => setToggleMenu(false)}
                  href={"/create/"}
                  className="hover:bg-[#383838] py-2 px-4"
                >
                  <li>Create</li>
                </Link>
                <Link
                  onClick={() => setToggleMenu(false)}
                  href={"/published"}
                  className="hover:bg-[#383838] py-2 px-4"
                >
                  <li>Published</li>
                </Link>
                <Link
                  onClick={() => setToggleMenu(false)}
                  href={"/drafts"}
                  className="hover:bg-[#383838] py-2 px-4"
                >
                  <li>Drafts</li>
                </Link>
                {/* <Link
                  onClick={() => setToggleMenu(false)}
                  href={"/bookmarked"}
                  className="hover:bg-[#383838] py-2 px-4"
                >
                  <li>Bookmarked</li>
                </Link> */}
              </>
            )}
            <Link
              onClick={() => setToggleMenu(false)}
              href={"/trending"}
              className="hover:bg-[#383838] py-2 px-4"
            >
              <li>Trending</li>
            </Link>
          </ul>
          <div className="pt-12 pb-4 px-4">
            <h2 className="font-bold opacity-75">Genres</h2>
            <GenresMenu setToggleMenu={setToggleMenu} />
          </div>
          {isAuthenticated && (
            <button
              onClick={() => removeToken()}
              className="hover:bg-[#383838] py-2 px-4 flex flex-row items-center gap-x-2"
            >
              <IoIosLogOut />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
