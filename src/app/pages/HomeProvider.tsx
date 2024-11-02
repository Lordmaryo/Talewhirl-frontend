import React from "react";
import Hero from "../components/Hero";
import HomeBody from "../components/HomeBody";

const HomeProvider = () => {
  return (
    <div>
      <Hero />
      <HomeBody />
    </div>
  );
};

export default HomeProvider;
