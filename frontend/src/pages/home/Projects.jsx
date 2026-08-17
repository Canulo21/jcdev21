import React, { useEffect, useState } from "react";
import BlurText from "../../components/layouts/utils/BlurText";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import apiFetch from "@/lib/api";
import { FaCode, FaLink, FaWordpress } from "react-icons/fa";
import SpotlightCard from "@/components/layouts/utils/SpotlightCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [getProject, setGetProject] = useState([]);
  const [view, setView] = useState("wordpressview");
  const [totalWPProj, setTotalWPProj] = useState(0);
  const [totalFullStack, setTotalFullStack] = useState(0);
  const [totalFrontend, setTotalFrontend] = useState(0);

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const getProjects = async () => {
    try {
      const data = await apiFetch("projects");

      const filterWp = data.filter((wp) => wp.category.name === "WordPress");
      const filterFullStack = data.filter(
        (fstack) => fstack.category.name === "Full Stack",
      );
      const filterFend = data.filter((fn) => fn.category.name === "Frontend");

      setTotalWPProj(filterWp.length);
      setTotalFullStack(filterFullStack.length);
      setTotalFrontend(filterFend.length);

      setGetProject(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  function LoaderSkeleton() {
    return (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} data-aos="fade-up">
            <SpotlightCard
              className="custom-spotlight-card h-full relative top-0 hover:-top-2 transition-all duration-300 ease-in-out !p-4"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="flex flex-col h-full">
                <Skeleton className="h-[140px] w-full bg-gray-400" />

                <Skeleton className="my-4 h-[20px] w-[35%] bg-gray-400" />

                <Skeleton className="mb-1 h-[15px] w-[65%] bg-gray-400" />
                <Skeleton className="mb-4 h-[15px] w-[40%] bg-gray-400" />

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1 mt-2  mb-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="px-[12px] py-[4px] rounded-full h-[10px] w-[30px] bg-gray-400"
                      />
                    ))}
                  </div>

                  <div className="flex flex-nowrap gap-2">
                    <Skeleton className="h-[30px] flex-1 bg-gray-400" />

                    <Skeleton className="h-[30px] flex-1 bg-gray-400" />
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </>
    );
  }

  function WordPressView() {
    return (
      <>
        <div data-aos="fade-down">
          <div className="flex items-center justify-center gap-4 md:gap-8 [&>*+*]:border-l md:[&>*+*]:pl-8 [&>*+*]:pl-4">
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

          <p className="mt-8 lg:mt-14 text-center tracking-wide">
            Most of the projects I’ve worked on are from the company, so I’ve
            only featured a few selected projects in my portfolio.
            <span className="text-[var(--text-secondary)] text-lg font-bold">
              Due to confidentiality and company ownership
            </span>
            , I’m unable to publicly showcase all of the projects I’ve
            contributed to. The projects featured here are a selection that best
            represents{" "}
            <span className="text-[var(--text-secondary)] text-lg font-bold">
              my skills, experience, and the type of work I’ve been involved in.
            </span>
          </p>

          {/* Display  Wordpress tester main*/}

          <div className="grid items-stretch mt-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading ? (
              <LoaderSkeleton />
            ) : (
              <>
                {getProject
                  .filter((item) => item.category.name === "WordPress")
                  .map((item, i) => (
                    <div key={i}>
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
                            <div className="w-full h-[140px] bg-[var(--bg-primary)] ">
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
                                <Button
                                  asChild
                                  variant="secondary"
                                  className="flex-1"
                                >
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
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  function FullStackView() {
    return (
      <>
        <div data-aos="fade-down">
          <div className="flex items-center justify-center gap-4 md:gap-8 [&>*+*]:border-l md:[&>*+*]:pl-8 [&>*+*]:pl-4">
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
            {isLoading ? (
              <LoaderSkeleton />
            ) : (
              <>
                {getProject
                  .filter((item) => item.category.name === "Full Stack")
                  .map((item, i) => (
                    <div key={i}>
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
                                <Button
                                  asChild
                                  variant="secondary"
                                  className="flex-1"
                                >
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
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  function FrontEndView() {
    return (
      <>
        <div data-aos="fade-down">
          <div className="flex items-center justify-center gap-4 md:gap-8 [&>*+*]:border-l md:[&>*+*]:pl-8 [&>*+*]:pl-4">
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
                {totalFrontend}+
              </h3>
              <p className="font-bold text-sm md:text-base leading-4 md:leading-2 tracking-widest text-[var(--text-secondary)] text-center">
                Projects
              </p>
            </div>
          </div>

          {/* Display  FullStack*/}

          <div className="grid items-stretch mt-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading ? (
              <LoaderSkeleton />
            ) : (
              <>
                {getProject
                  .filter((item) => item.category.name === "Frontend")
                  .map((item, i) => (
                    <div key={i}>
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
                                <Button
                                  asChild
                                  variant="secondary"
                                  className="flex-1"
                                >
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
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  const renderView = () => {
    switch (view) {
      case "wordpressview":
        return <WordPressView />;

      case "frontendview":
        return <FrontEndView />;

      case "fullstackview":
        return <FullStackView />;

      default:
        return <WordPressView />;
    }
  };

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

      <div data-aos="fade-down" className="flex justify-center   mb-10">
        <ToggleButtonGroup
          className="gap-2 flex-wrap justify-center"
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
            value="frontendview"
            aria-label="frontendview"
          >
            <FaCode />
            Frontend
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
      {renderView()}
    </>
  );
}

export default Projects;
