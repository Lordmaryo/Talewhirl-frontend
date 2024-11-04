import React, { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  label: string;
  icon?: FC;
}

const ButtonTransparent = ({
  onClick,
  label,
  className,
  disabled,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      className={`bg-transparent border border-zinc-500 text-white hover:bg-[#ffffff08] px-6 py-2 rounded-md font-bold transition-colors flex justify-center items-center gap-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  );
};

export default ButtonTransparent;
