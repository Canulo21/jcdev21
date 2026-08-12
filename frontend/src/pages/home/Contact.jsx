import BlurText from "@/components/layouts/utils/BlurText";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import me from "../../assets/images/me-contact.png";

const contacts = [
  {
    title: "Email",
    icon: <SiGmail />,
    link: "canulodev21@gmail.com",
  },
  {
    title: "Facebook",
    icon: <FaFacebook />,
    link: "facebook.com/jhoncarlo.canulo/",
  },
  {
    title: "LinkedIn",
    icon: <FaLinkedin />,
    link: "linkedin.com/in/jhon-carlo-canulo-116013227/",
  },
  {
    title: "Github",
    icon: <FaGithub />,
    link: "github.com/Canulo21",
  },
];

function Contact() {
  return (
    <>
      <h2 className="title">
        <BlurText
          text="Contact Me"
          delay={90}
          animateBy="words"
          direction="top"
        />
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-end overflow-hidden">
        <div
          data-aos="fade-right"
          className="flex flex-col gap-6 w-full lg:w-[60%] pb-[40px] lg:pb-[100px]"
        >
          {contacts.map((item, i) => (
            <a
              href={
                item.title === "Email"
                  ? `mailto:${item.link}`
                  : `https://${item.link}`
              }
              target={item.title === "Email" ? undefined : "_blank"}
              rel={item.title === "Email" ? undefined : "noopener noreferrer"}
            >
              <div className="flex items-center gap-6 sm:gap-4 xl:gap-6 border border-white/40 rounded-lg py-4 px-6 hover:bg-[var(--bg-secondary)] transition-all duration-300 ease-in-out relative top-0 hover:-top-3">
                <span className="text-2xl tracking-widest font-bold">
                  0{i + 1}
                </span>

                <span className="p-3 bg-gray-800 rounded-full text-2xl sm:text-lg xl:text-2xl">
                  {item.icon}
                </span>

                <span className="text-xl sm:text-md xl:text-xl inline-block w-[80px] xl:w-[100px]">
                  {item.title}
                </span>

                <span className="hidden sm:block text-sm xl:text-md">
                  {item.link}
                </span>
              </div>
            </a>
          ))}
        </div>
        <div
          data-aos="fade-left"
          className="w-full flex justify-center lg:justify-end lg:w-[35%]"
        >
          <img
            className="brightness-85 saturate-80  w-[65%] sm:w-[35%] lg:w-full"
            src={me}
            alt="Jhon Carlo"
          />
        </div>
      </div>
    </>
  );
}

export default Contact;
