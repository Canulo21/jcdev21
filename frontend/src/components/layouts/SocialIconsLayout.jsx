import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export const socials = [
  {
    title: "facebook",
    link: "https://www.facebook.com/jhoncarlo.canulo",
    icon: <FaFacebook />,
  },
  {
    title: "linkedin",
    link: "https://www.linkedin.com/in/jhon-carlo-canulo-116013227/",
    icon: <FaLinkedin />,
  },
  {
    title: "github",
    link: "https://github.com/Canulo21",
    icon: <FaGithub />,
  },
];

function SocialIconsLayout() {
  return (
    <>
      <div
        data-aos="fade-left"
        className="hidden lg:flex fixed bottom-20 z-[10] right-5 2xl:right-20"
      >
        <div className="flex gap-4 social-icons-group flex-col w-fit ">
          {socials.map((item) => (
            <a
              className="text-3xl hover:text-[var(--text-secondary)]"
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default SocialIconsLayout;
