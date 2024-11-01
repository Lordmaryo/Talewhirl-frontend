import Image from "next/image";
import React from "react";
import Logo from "../image/TaleWhirlFox-removebg.png";

const Footer = () => {
  return (
    <>
      <div className="sm:hidden border-t border-[#8b8b8b] sm:pt-20 pt-10 py-4 px-4 flex flex-col gap-4">
        <div className="flex flex-row items-end">
          <Image src={Logo} className="w-12 h-12 object-cover" alt="logo" />
          <h2 className="text-xl font-bold">Talewhirl</h2>
        </div>
        <p className="text-sm w-full">
          Talewhirl is a free storytelling platform with zero ads. You can
          explore and enjoy thousands of captivating stories without the need to
          sign up or pay. With a collection of over 10,000 stories and series,
          Talewhirl lets you dive into tales online or download them to enjoy
          later at your convenience but download feature is coming soon!
        </p>
        <h2 className="font-bold">© 2024 TaleWhirl. All Rights Reserved.</h2>
      </div>

      <div className="hidden border-t border-[rgb(139,139,139)] sm:pt-20 pt-10 py-10 px-4 sm:flex flex-row justify-around">
        <div className="flex flex-col gap-4 pr-4">
          <div className="flex flex-row items-end">
            <Image src={Logo} className="w-16 h-16 object-cover" alt="logo" />
            <h2 className="text-xl font-bold">Talewhirl</h2>
          </div>
          <h2 className="font-bold">© 2024 TaleWhirl. All Rights Reserved.</h2>
        </div>
        <p className="text-sm sm:w-[600px] lg:w-[500px]">
          Talewhirl is a free storytelling platform with zero ads. You can
          explore and enjoy thousands of captivating stories without the need to
          sign up or pay. With a collection of over 10,000 stories and series,
          Talewhirl lets you dive into tales online or download them to enjoy
          later at your convenience but download feature is coming soon!
        </p>
      </div>
    </>
  );
};

export default Footer;
