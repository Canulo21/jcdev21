import React, { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

export const links = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function NavBar() {
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
    <>
      <header className="h-[80px] xl:h-28 sticky top-0 z-50 border-t-[var(--bg-secondary)] border-t-3 flex items-center justify-between px-5 2xl:px-24 bg-[var(--bg-primary)]">
        <a href="/" className="text-white text-3xl md:text-5xl font-bold ">
          JC <span className="text-[var(--text-secondary)]">Dev.</span>
        </a>

        <nav className="hidden lg:flex gap-6 text-lg font-medium">
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

        <div className="show lg:hidden">
          <HamburgerMenu />
        </div>
      </header>
    </>
  );
}

export default NavBar;
