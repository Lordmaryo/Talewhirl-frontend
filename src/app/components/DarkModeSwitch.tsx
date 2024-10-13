"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

const DarkModeswitch = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme;
  currentTheme === "system" ? systemTheme : theme;
  return (
    <div>
      {mounted &&
        (currentTheme === "dark" ? (
          <button
            className="text-lg sm:text-1xl p-0 mt-1 hover:text-amber-500"
            onClick={() => 
              setTheme("light")
            }
          >
            <MdOutlineLightMode />
          </button>
        ) : (
          <button
            className="text-lg sm:text-1xl p-0 mt-1 hover:text-amber-500"
            onClick={() => 
              setTheme("dark")
            }
          >
            <MdOutlineDarkMode />
          </button>
        ))}
    </div>
  );
};

export default DarkModeswitch;
