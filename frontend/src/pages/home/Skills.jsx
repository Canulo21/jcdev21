import BlurText from "@/components/layouts/utils/BlurText";
import React from "react";
import {
  FaBootstrap,
  FaCode,
  FaCss3,
  FaDocker,
  FaGit,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaravel,
  FaNodeJs,
  FaPhp,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  SiCodeblocks,
  SiElementor,
  SiLaragon,
  SiMysql,
  SiTailwindcss,
  SiTypescript,
  SiWoocommerce,
  SiXampp,
  SiYoast,
} from "react-icons/si";
import { TbBrandAdobePhotoshop, TbBrandAdobeXd } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const frontends = [
  {
    title: "HTML",
    icon: FaHtml5,
  },
  {
    title: "CSS",
    icon: FaCss3,
  },
  {
    title: "JavaScript",
    icon: FaJs,
  },
  {
    title: "Bootsrap",
    icon: FaBootstrap,
  },
  {
    title: "Tailwind",
    icon: SiTailwindcss,
  },
  {
    title: "React",
    icon: FaReact,
  },
  {
    title: "Typescrript",
    icon: SiTypescript,
  },
];

const backends = [
  {
    title: "MySQL",
    icon: SiMysql,
  },
  {
    title: "PHP",
    icon: FaPhp,
  },
  {
    title: "Laravel",
    icon: FaLaravel,
  },
  {
    title: "Node.js",
    icon: FaNodeJs,
  },
];

const cms = [
  {
    title: "WordPress",
    icon: FaWordpress,
  },
  {
    title: "WooCommerce",
    icon: SiWoocommerce,
  },
  {
    title: "Elementor",
    icon: SiElementor,
  },
  {
    title: "Site Origin",
    icon: FaCode,
  },
  {
    title: "ACF",
    icon: FaCode,
  },
  {
    title: "Yoast SEO",
    icon: SiYoast,
  },
];

const tools = [
  {
    title: "Git",
    icon: FaGit,
  },
  {
    title: "GitHub",
    icon: FaGithub,
  },
  {
    title: "VS Code",
    icon: VscVscode,
  },
  {
    title: "Xammp",
    icon: SiXampp,
  },
  {
    title: "Laragon",
    icon: SiLaragon,
  },
  {
    title: "Docker",
    icon: FaDocker,
  },
  {
    title: "Adobe XD",
    icon: TbBrandAdobeXd,
  },
  {
    title: "Adobe Photoshop",
    icon: TbBrandAdobePhotoshop,
  },
];

function Skills() {
  return (
    <>
      <h2 className="title">
        <BlurText
          text="Technical Skills"
          delay={90}
          animateBy="words"
          direction="top"
        />
      </h2>

      {/* Fronted */}

      <div className="group">
        <p className="text-muted-foreground text-w-line font-xl font-medium group-hover:text-[var(--bg-secondary)] transition-all duration-300 ease-in-out">
          Fronted
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4 xl:gap-8 py-6 sm:py-10">
          {frontends.map((frontend, i) => {
            const Icon = frontend.icon;

            return (
              <div key={i} data-aos="fade-up">
                <div
                  className="flex items-center gap-3 flex-col bg-[var(--bg-primary)] border border-white/10 relative top-0 hover:-top-2 hover:border-[var(--bg-secondary)]  transition-all
    duration-500
    ease-in-out py-6 px-2 rounded-md"
                >
                  {Icon && (
                    <Icon
                      aria-label={frontend.title}
                      role="img"
                      className="text-2xl md:text-4xl text-[var(--bg-secondary)]"
                    />
                  )}
                  <p className="font-medium text-[10px] md:!text-sm truncate text-center">
                    {frontend.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="group">
        <p className="text-muted-foreground text-w-line font-xl font-medium group-hover:text-[var(--bg-secondary)] transition-all duration-300 ease-in-out">
          Backend & Data
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4 xl:gap-8 py-6 sm:py-10">
          {backends.map((backend, i) => {
            const Icon = backend.icon;

            return (
              <div key={i} data-aos="fade-up">
                <div
                  className="flex items-center gap-3 flex-col bg-[var(--bg-primary)] border border-white/10 relative top-0 hover:-top-2 hover:border-[var(--bg-secondary)]  transition-all
    duration-500
    ease-in-out py-6 px-2 rounded-md"
                >
                  {Icon && (
                    <Icon className="text-2xl md:text-4xl text-[var(--bg-secondary)]" />
                  )}
                  <p className="font-medium text-[10px] md:!text-sm truncate text-center">
                    {backend.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CMS & E-commerce */}

      <div className="group">
        <p className="text-muted-foreground text-w-line font-xl font-medium group-hover:text-[var(--bg-secondary)] transition-all duration-300 ease-in-out">
          CMS & E-commerce
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4 xl:gap-8 py-6 sm:py-10">
          {cms.map((cm, i) => {
            const Icon = cm.icon;

            return (
              <div key={i} data-aos="fade-up">
                <div
                  className="flex items-center gap-3 flex-col bg-[var(--bg-primary)] border border-white/10 relative top-0 hover:-top-2 hover:border-[var(--bg-secondary)]  transition-all
    duration-500
    ease-in-out py-6 px-2 rounded-md"
                >
                  {Icon && (
                    <Icon className="text-2xl md:text-4xl text-[var(--bg-secondary)]" />
                  )}
                  <p className="font-medium text-[10px] md:!text-sm truncate text-center">
                    {cm.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools & Integrations */}

      <div className="group">
        <p className="text-muted-foreground text-w-line font-xl font-medium group-hover:text-[var(--bg-secondary)] transition-all duration-300 ease-in-out">
          Tools & Integrations
        </p>

        <div className="grid pb-0 grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4 xl:gap-8 py-6 sm:py-10">
          {tools.map((tool, i) => {
            const Icon = tool.icon;

            return (
              <div key={i} data-aos="fade-up">
                <div
                  className="flex items-center gap-3 flex-col bg-[var(--bg-primary)] border border-white/10 relative top-0 hover:-top-2 hover:border-[var(--bg-secondary)]  transition-all
    duration-500
    ease-in-out py-6 px-2 rounded-md"
                >
                  {Icon && (
                    <Icon className="text-2xl md:text-4xl text-[var(--bg-secondary)]" />
                  )}
                  <p className="font-medium text-xs sm:text-[10px] md:!text-sm truncate text-center">
                    {tool.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Skills;
