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
  const [totalWPProj, setTotalWPProj] = useState(0);
  const [totalFullStack, setTotalFullStack] = useState(0);

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const getProjects = async () => {
    try {
      const data = await apiFetch("projects");
      console.log("here", data);

      setTotalWPProj(data.length);
      setTotalFullStack(data.length);
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
        <div
          data-aos="fade-down"
          className="flex items-center justify-center gap-4 md:gap-8 [&>*+*]:border-l md:[&>*+*]:pl-8 [&>*+*]:pl-4"
        >
          <div>
            <h3 className="!text-4xl sm:!text-5xl md:!text-7xl text-center">
              5+
            </h3>
            <p className="font-bold text-sm md:text-base leading-4 md:leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="!text-4xl sm:!text-5xl md:!text-7xl text-center">
              {totalWPProj}+
            </h3>
            <p className="font-bold text-sm md:text-base leading-4 md:leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Projects
            </p>
          </div>
        </div>

        {/* Display  Wordpress tester main*/}

        <div className="grid items-stretch mt-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {getProject.map((item, i) => (
            <div key={i} data-aos="fade-up">
              <SpotlightCard
                className="custom-spotlight-card h-full relative top-0 hover:-top-2 transition-all duration-300 ease-in-out !p-4"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="flex flex-col h-full">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className=" w-full h-[140xp]"
                    />
                  ) : (
                    <div className="w-full h-[140px] bg-[var(--bg-primary)]">
                      <FaWordpress size={80} />
                    </div>
                  )}

                  <p className="my-4 text-xl truncate uppercase font-semibold text-center ">
                    {item.title}
                  </p>

                  <p className="my-4 text-sm line-clamp-3 text-white/70 ">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1 mt-2  mb-4">
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
        <div
          data-aos="fade-down"
          className="flex items-center justify-center gap-4 md:gap-8 [&>*+*]:border-l md:[&>*+*]:pl-8 [&>*+*]:pl-4"
        >
          <div>
            <h3 className="!text-4xl sm:!text-5xl md:!text-7xl text-center">
              2+
            </h3>
            <p className="font-bold text-sm md:text-base leading-4 md:leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="!text-4xl sm:!text-5xl md:!text-7xl text-center">
              {totalFullStack}+
            </h3>
            <p className="font-bold text-sm md:text-base leading-4 md:leading-2 tracking-widest text-[var(--text-secondary)] text-center">
              Projects
            </p>
          </div>
        </div>

        {/* Display  FullStack*/}

        <div className="grid items-stretch mt-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {getProject.map((item, i) => (
            <div key={i} data-aos="fade-up">
              <SpotlightCard
                className="custom-spotlight-card h-full relative top-0 hover:-top-2 transition-all duration-300 ease-in-out !p-4"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="flex flex-col h-full">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className=" w-full h-[140xp]"
                    />
                  ) : (
                    <div className="w-full h-[140px] bg-[var(--bg-primary)]">
                      <FaCode size={80} />
                    </div>
                  )}

                  <p className="my-4 text-xl truncate uppercase font-semibold text-center ">
                    {item.title}
                  </p>

                  <p className="my-4 text-sm line-clamp-3 text-white/70 ">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1 mt-2  mb-4">
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
