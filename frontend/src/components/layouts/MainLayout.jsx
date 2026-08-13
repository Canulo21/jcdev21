import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import BannerLayout from "./BannerLayout";
import SocialIconsLayout from "./SocialIconsLayout";

import BeamsBgLayout from "./BeamsBgLayout";
import GithubContributionsLayout from "./GithubContributionsLayout";
import { Button } from "../ui/button";
import { FaArrowUp } from "react-icons/fa";
import FooterLayout from "./FooterLayout";
import ScrollProgress from "./ScrollPogress";

function MainLayout() {
  return (
    <>
      <div>
        <ScrollProgress />
        <NavBar />
        <BannerLayout />
        <GithubContributionsLayout />
        <main className="relative z-10">
          <Outlet />
          <BeamsBgLayout />
        </main>
        <FooterLayout />
        <SocialIconsLayout />

        {/* back top */}
        <BackToTop />
      </div>
    </>
  );
}

export default MainLayout;

function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {showButton && (
        <Button
          data-aos="fade-up"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="bg-[var(--bg-secondary)] fixed w-[40px] h-[40px] right-5 2xl:right-19 bottom-5 z-10"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </Button>
      )}
    </>
  );
}
