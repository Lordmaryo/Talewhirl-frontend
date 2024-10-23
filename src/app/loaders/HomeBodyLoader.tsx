import React from "react";

const HomeBodyLoader = () => {
  return (
    <div className="py-6 px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 text-center">
      <div className="loader-box rounded-md h-[250px] w-[200px] bg-[#272727]" />
      <div className="loader-box rounded-md h-[250px] w-[200px] bg-[#272727]" />
      <div className="loader-box rounded-md h-[250px] w-[200px] bg-[#272727]" />
      <div className="loader-box rounded-md h-[250px] w-[200px] bg-[#272727]" />
      <div className="loader-box rounded-md h-[250px] w-[200px] bg-[#272727]" />
    </div>
  );
};

export default HomeBodyLoader;
