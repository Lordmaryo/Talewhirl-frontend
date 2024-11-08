import React from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  className?: string;
}

const Button = ({ onClick, label, type, disabled, className }: ButtonProps) => {
  return (
    <button
      className={`bg-green-700 hover:opacity-75 px-6 py-2 rounded-md font-bold transition-opacity ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
