import React, { useEffect, useState } from "react";
import GetDrafts from "./GetDrafts";
import Published from "./Published";

type userIdProps = {
  userId: string;
  currentUserId: number;
};

const NavigateProfile = ({ userId, currentUserId }: userIdProps) => {
  const [activeTabs, setActiveTabs] = useState<string>("published");
  const isCurrentUser = Number(userId) == currentUserId;

  useEffect(() => {}, []);

  const renderContents = () => {
    switch (activeTabs) {
      case "drafts":
        return <GetDrafts />;
      case "about":
        return <div>about</div>;
      case "published":
        return <Published />;
      default:
        return 
    }
  };

  return (
    <div>
      <div
        className="pt-6 sm:pt-48  px-4 md:px-10 mt-4 border-b-[1px] pb-2 border-zinc-500
         text-sm sm:text-base flex flex-row justify-around items-center"
      >
        <button
          onClick={() => setActiveTabs("published")}
          className="hover:bg-zinc-700 transition-colors w-full text-center py-2 rounded-md"
        >
          Published
        </button>
        {isCurrentUser && (
          <button
            onClick={() => setActiveTabs("drafts")}
            className="hover:bg-zinc-700 transition-colors w-full text-center py-2 rounded-md"
          >
            Drafts
          </button>
        )}
        <button
          onClick={() => setActiveTabs("about")}
          className="hover:bg-zinc-700 transition-colors w-full text-center py-2 rounded-md"
        >
          About
        </button>
        <style jsx>{`
          button {
            cursor: pointer;
            padding: 10px;
          }
          .active {
            font-weight: bold;
            border-bottom: 2px solid black;
          }
        `}</style>
      </div>
      <div>{renderContents()}</div>
    </div>
  );
};

export default NavigateProfile;
