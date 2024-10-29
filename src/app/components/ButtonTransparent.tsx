import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  label: string;
}

const ButtonTransparent = ({
  onClick,
  label,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`bg-transparent border border-zinc-500 text-white hover:bg-[#ffffff08] px-5 py-2 rounded-md font-bold transition-colors ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonTransparent;
