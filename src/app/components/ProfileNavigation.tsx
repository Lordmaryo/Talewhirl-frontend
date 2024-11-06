import React, { useState } from "react";
import GetDrafts from "./GetDrafts";
import Published from "./Published";
import AboutUser from "./AboutUser";

type userIdProps = {
  userId: string;
  currentUserId: number;
};

const ProfileNavigation = ({ userId, currentUserId }: userIdProps) => {
  const [activeTabs, setActiveTabs] = useState<string>("published");
  const isCurrentUser = Number(userId) == currentUserId;

  const renderContents = () => {
    switch (activeTabs) {
      case "drafts":
        return <GetDrafts />;
      case "about":
        return <AboutUser userId={userId} />;
      case "published":
        return <Published />;
      default:
        return;
    }
  };

  return (
    <div>
      <div
        className="pt-6 sm:pt-48 px-4 md:px-10 mt-4 border-b-[1px] border-zinc-500
         text-sm sm:text-base flex flex-row justify-around items-center"
      >
        <button
          onClick={() => setActiveTabs("published")}
          className={`hover:bg-zinc-700 transition-colors w-full text-center py-2 ${
            activeTabs === "published" ? "active" : ""
          }`}
        >
          Published
        </button>
        {isCurrentUser && (
          <button
            onClick={() => setActiveTabs("drafts")}
            className={`hover:bg-zinc-700 transition-colors w-full text-center py-2 ${
              activeTabs === "drafts" ? "active" : ""
            }`}
          >
            Drafts
          </button>
        )}
        <button
          onClick={() => setActiveTabs("about")}
          className={`hover:bg-zinc-700 transition-colors w-full text-center py-2 ${
            activeTabs === "about" ? "active" : ""
          }`}
        >
          About
        </button>
        <style jsx>{`
          button.active {
            font-weight: bold;
            border-bottom: 3px solid white;
            border-radius: 0;
          }
        `}</style>
      </div>
      <div>{renderContents()}</div>
    </div>
  );
};

export default ProfileNavigation;
