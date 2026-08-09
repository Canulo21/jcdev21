import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { links } from "./NavBar";
import { Button } from "../ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { socials } from "./SocialIconsLayout";

function HamburgerMenu() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        <GiHamburgerMenu size={30} />
      </DrawerTrigger>
      <DrawerContent className="bg-[var(--bg-primary)] text-white py-8 px-4 border-l-[var(--bg-secondary)] !border-l-4">
        <DrawerHeader>
          <a
            href="/"
            className="text-white text-center text-6xl font-bold mb-10"
          >
            JC <span className="text-[var(--text-secondary)]">Dev.</span>
          </a>
        </DrawerHeader>
        <div className="p-4">
          <nav className="flex flex-col [&>button]:mb-3 [&>button]:uppercase font-semibold [&>button]:text-left text-2xl ">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={
                  activeSection === link.id
                    ? "text-[var(--text-secondary)]"
                    : "hover:text-[var(--text-secondary)]"
                }
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <DrawerFooter>
          <div className="flex gap-6 justify-center mt-5">
            {socials.map((item) => (
              <a
                className="text-4xl hover:text-[var(--text-secondary)]"
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default HamburgerMenu;
