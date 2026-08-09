import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import BannerLayout from "./BannerLayout";
import SocialIconsLayout from "./SocialIconsLayout";

import BeamsBgLayout from "./BeamsBgLayout";
import GithubContributionsLayout from "./GithubContributionsLayout";
import { Button } from "../ui/button";
import { FaArrowUp } from "react-icons/fa";
import FooterLayout from "./FooterLayout";

function MainLayout() {
  return (
    <>
      <div>
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
  return (
    <Button
      data-aos="fade-up"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="bg-[var(--bg-secondary)] fixed w-[40px] h-[40px] right-2.5 lg:right-19 bottom-5 z-10"
      aria-label="Back to top"
    >
      <FaArrowUp />
    </Button>
  );
}
