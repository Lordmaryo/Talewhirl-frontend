import React from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string;
}

const ButtonTransparent = ({ onClick, label }: ButtonProps) => {
  return (
    <button
      className="bg-transparent border text-white hover:bg-[#ffffff08] px-5 py-2 rounded-md font-bold transition-colors"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonTransparent;
