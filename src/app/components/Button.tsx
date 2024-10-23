import Link from "next/link";
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string;
}

const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button
      className="bg-green-700 text-white hover:bg-green-800 px-6 py-2 rounded-md font-bold transition-colors"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
