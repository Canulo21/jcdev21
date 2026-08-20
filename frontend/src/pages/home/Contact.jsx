import BlurText from "@/components/layouts/utils/BlurText";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import me from "../../assets/images/me-contact.webp";

const contacts = [
  {
    title: "Email",
    icon: SiGmail,
    link: "canulodev21@gmail.com",
  },
  {
    title: "Facebook",
    icon: FaFacebook,
    link: "facebook.com/jhoncarlo.canulo/",
  },
  {
    title: "LinkedIn",
    icon: FaLinkedin,
    link: "linkedin.com/in/jhon-carlo-canulo-116013227/",
  },
  {
    title: "Github",
    icon: FaGithub,
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
          {contacts.map((item, i) => {
            const Icon = item.icon;

            return (
              <div key={i}>
                <a
                  href={
                    item.title === "Email"
                      ? `mailto:${item.link}`
                      : `https://${item.link}`
                  }
                  target={item.title === "Email" ? undefined : "_blank"}
                  rel={
                    item.title === "Email" ? undefined : "noopener noreferrer"
                  }
                >
                  <div className="relative top-0 flex items-center gap-6 rounded-lg border border-white/40 px-6 py-4 transition-all duration-300 ease-in-out hover:-top-3 hover:bg-[var(--bg-secondary)] sm:gap-4 xl:gap-6">
                    <span className="text-2xl font-bold tracking-widest">
                      0{contacts.indexOf(item) + 1}
                    </span>

                    {Icon && (
                      <Icon
                        aria-label={item.title}
                        role="img"
                        className="p-3 bg-gray-800 rounded-full text-2xl sm:text-lg xl:text-2xl"
                      />
                    )}

                    <span className="inline-block w-[80px] text-xl sm:text-md xl:w-[100px] xl:text-xl">
                      {item.title}
                    </span>

                    <span className="hidden text-sm sm:block xl:text-md">
                      {item.link}
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        <div
          data-aos="fade-left"
          className="w-full flex justify-center lg:justify-end lg:w-[35%]"
        >
          <img
            className="brightness-85 saturate-80  w-[65%] sm:w-[35%] lg:w-full"
            src={me}
            width="488"
            height="605"
            alt="Jhon Carlo"
          />
        </div>
      </div>
    </>
  );
}

export default Contact;
