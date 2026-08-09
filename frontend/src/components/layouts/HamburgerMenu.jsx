import React, { useEffect, useState, useRef } from "react";
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
import { socials } from "./SocialIconsLayout";

function HamburgerMenu() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const isDrawerOpenRef = useRef(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        // Only update if not scrolling and drawer is closed
        if (!isScrollingRef.current && !isDrawerOpenRef.current) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (
        window.scrollY < 100 &&
        !isScrollingRef.current &&
        !isDrawerOpenRef.current
      ) {
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
    // Set active section immediately when clicked
    setActiveSection(id);

    // Set scrolling flag to prevent observer from interfering
    isScrollingRef.current = true;

    // Close the drawer
    setIsOpen(false);
    isDrawerOpenRef.current = false;

    // Small delay to let drawer close
    setTimeout(() => {
      if (id === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        // Reset scrolling flag after scroll completes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        // Calculate position to scroll to
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });

        // Reset scrolling flag after scroll completes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    }, 150);
  };

  const handleDrawerOpenChange = (open) => {
    setIsOpen(open);
    isDrawerOpenRef.current = open;

    // When drawer closes, update active section based on current viewport
    if (!open) {
      // Small delay to let drawer close animation finish
      setTimeout(() => {
        const sections = document.querySelectorAll("section[id]");
        let foundActive = false;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= 0) {
            setActiveSection(section.id);
            foundActive = true;
          }
        });

        if (!foundActive && window.scrollY < 100) {
          setActiveSection("home");
        }
      }, 300);
    }
  };

  return (
    <Drawer
      direction="right"
      open={isOpen}
      onOpenChange={handleDrawerOpenChange}
    >
      <DrawerTrigger asChild>
        <GiHamburgerMenu size={30} />
      </DrawerTrigger>
      <DrawerContent className="bg-[var(--bg-primary)] text-white py-8 px-4 border-l-[var(--bg-secondary)] !border-l-4">
        <DrawerHeader>
          <a
            href="/"
            className="text-white text-center text-6xl font-bold mb-10"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
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
                className={`transition-colors duration-200 ${
                  activeSection === link.id
                    ? "text-[var(--text-secondary)]"
                    : "hover:text-[var(--text-secondary)]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <DrawerFooter>
          <div className="flex gap-4 justify-center ">
            {socials.map((item) => (
              <a
                className="text-3xl hover:text-[var(--text-secondary)] cursor-pointer transition-colors duration-200"
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
