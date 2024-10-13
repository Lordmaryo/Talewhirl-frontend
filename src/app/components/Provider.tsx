import React, { ReactNode, FC } from "react";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <div className="bg-[#e5dede] dark:bg-[#171717] min-h-screen transition-colors duration-300">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Provider;
