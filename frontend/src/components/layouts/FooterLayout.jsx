import React, { useEffect, useState } from "react";
import { links } from "./NavBar";
import SpotlightCard from "./utils/SpotlightCard";

function FooterLayout() {
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
    <section className="!p-0 wrap-1395">
      <SpotlightCard
        className=" custom-spotlight-card pt-8 md:pt-15 pb-4 md:pb-5 px-3 xs:px-6 md:px-10"
        spotlightColor="rgba(0, 229, 255, 0.1)"
      >
        <nav className="flex justify-center md:justify-start gap-2 sm:gap-3 sm:gap-6 text-lg font-medium pb-6 md:pb-10">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`text-xs sm:text-sm ${
                activeSection === link.id
                  ? "text-[var(--text-secondary)]"
                  : "hover:text-[var(--text-secondary)]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div>
          <p className="text-muted-foreground text-center md:text-left text-sm font-bold pt-5 border-t border-t-white/30">
            © 2026 Jhon Carlo Canulo · jcdev21.vercel.app
          </p>
        </div>
      </SpotlightCard>
    </section>
  );
}

export default FooterLayout;
