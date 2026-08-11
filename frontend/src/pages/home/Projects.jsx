import React, { useEffect, useState } from "react";
import BlurText from "../../components/layouts/utils/BlurText";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import apiFetch from "@/lib/api";
import {
  FaBox,
  FaCode,
  FaLink,
  FaMedal,
  FaTv,
  FaWordpress,
} from "react-icons/fa";
import SpotlightCard from "@/components/layouts/utils/SpotlightCard";
import { Button } from "@/components/ui/button";

function Projects() {
  const [getProject, setGetProject] = useState([]);
  const [view, setView] = useState("wordpressview");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const getProjects = async () => {
    try {
      const data = await apiFetch("projects");
      console.log("here", data);
      setGetProject(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  function WordPressView() {
    return (
      <>
        <div className="flex items-center justify-center gap-8 [&>*+*]:border-l [&>*+*]:pl-8">
          <div>
            <h3 className="!text-7xl">5+</h3>
            <p className="font-bold leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="!text-7xl">13+</h3>
            <p className="font-bold leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Projects
            </p>
          </div>
        </div>

        {/* Display  */}

        <div className="grid  mt-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {getProject.map((item, i) => (
            <div key={i} data-aos="fade-up">
              <SpotlightCard
                className="custom-spotlight-card relative top-0 hover:-top-2 transition-all duration-300 ease-in-out !p-4"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className=" w-full h-[140xp]"
                    />
                  ) : (
                    <div className="w-full h-[140px] bg-[var(--bg-primary)]">
                      <FaMedal size={80} />
                    </div>
                  )}

                  <div className="mb-5">
                    <p className="my-4 text-xl truncate uppercase font-semibold text-center ">
                      {item.title}
                    </p>

                    <p className="my-4 text-sm truncate text-white/70 ">
                      {item.description}
                    </p>

                    <div className="flex gap-1 my-6">
                      {item.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-800 px-[12px] py-[4px] rounded-full text-white/80"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-nowrap gap-2">
                      {item.live_url ? (
                        <Button asChild variant="secondary" className="flex-1">
                          <a
                            href={item.live_url}
                            target="_blank"
                            rel="noopener"
                          >
                            Visit Live
                            <FaLink />
                          </a>
                        </Button>
                      ) : null}
                      {item.github_url ? (
                        <Button
                          asChild
                          variant="destructive"
                          className="flex-1"
                        >
                          <a
                            href={item.github_url}
                            target="_blank"
                            rel="noopener"
                          >
                            Visit Github
                            <FaLink />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </>
    );
  }

  function FullStackView() {
    return (
      <>
        <div className="flex items-center justify-center gap-8 [&>*+*]:border-l [&>*+*]:pl-8">
          <div>
            <h3 className="!text-7xl">2+</h3>
            <p className="font-bold leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="!text-7xl">3+</h3>
            <p className="font-bold leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Projects
            </p>
          </div>
        </div>

        {/* Display  Tester*/}

        <div className="grid  mt-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {getProject.map((item, i) => (
            <div key={i} data-aos="fade-up">
              <SpotlightCard
                className="custom-spotlight-card relative top-0 hover:-top-2 transition-all duration-300 ease-in-out !p-4"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className=" w-full h-[140xp]"
                    />
                  ) : (
                    <div className="w-full h-[140px] bg-[var(--bg-primary)]">
                      <FaMedal size={80} />
                    </div>
                  )}

                  <div className="mb-5">
                    <p className="my-4 text-xl truncate uppercase font-semibold text-center ">
                      {item.title}
                    </p>

                    <p className="my-4 text-sm truncate text-white/70 ">
                      {item.description}
                    </p>

                    <div className="flex gap-1 my-6">
                      {item.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-800 px-[12px] py-[4px] rounded-full text-white/80"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-nowrap gap-2">
                      {item.live_url ? (
                        <Button asChild variant="secondary" className="flex-1">
                          <a
                            href={item.live_url}
                            target="_blank"
                            rel="noopener"
                          >
                            Visit Live
                            <FaLink />
                          </a>
                        </Button>
                      ) : null}
                      {item.github_url ? (
                        <Button
                          asChild
                          variant="destructive"
                          className="flex-1"
                        >
                          <a
                            href={item.github_url}
                            target="_blank"
                            rel="noopener"
                          >
                            Visit Github
                            <FaLink />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="title">
        <BlurText
          text="Projects Showcase"
          delay={90}
          animateBy="words"
          direction="top"
        />
      </h1>

      <div data-aos="fade-down" className="flex justify-center mb-10">
        <ToggleButtonGroup
          orientation="horizontal"
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            className="!text-white gap-3"
            value="fullstackview"
            aria-label="fullstackview"
          >
            <FaCode />
            Full Stack
          </ToggleButton>
          <ToggleButton
            className="!text-white gap-3"
            value="wordpressview"
            aria-label="wordpressview"
          >
            <FaWordpress />
            WordPress
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {view === "wordpressview" ? <WordPressView /> : <FullStackView />}
    </>
  );
}

export default Projects;
