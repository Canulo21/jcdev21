import React from "react";

function SocialIconsLayout() {
  return (
    <>
      <div
        data-aos="fade-left"
        className="hidden lg:fixed bottom-20  z-[10] right-20"
      >
        <div className="flex gap-4 social-icons-group flex-col w-fit ">
          <a
            aria-label="fb"
            href="https://www.facebook.com/jhoncarlo.canulo"
            target="_blank"
            rel="noopener noreferrer"
            className="fb-icon"
          />
          <a
            aria-label="linkedin"
            href="https://www.linkedin.com/in/jhon-carlo-canulo-116013227/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon"
          />
          <a
            aria-label="github"
            href="https://github.com/Canulo21"
            target="_blank"
            rel="noopener noreferrer"
            className="github-icon"
          />
        </div>
      </div>
    </>
  );
}

export default SocialIconsLayout;
