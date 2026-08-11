import BlurText from "@/components/layouts/utils/BlurText";
import { Button } from "@/components/ui/button";
import { FaBox, FaClipboardCheck, FaMedal, FaTv } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SpotlightCard from "@/components/layouts/utils/SpotlightCard";
import Autoplay from "embla-carousel-autoplay";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import apiFetch from "@/lib/api";

function Certificates() {
  const [view, setView] = useState("gridview");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const [getCertificate, setGetCertificate] = useState([]);

  const getCertificates = async () => {
    try {
      const data = await apiFetch("certifications");
      setGetCertificate(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    }
  };

  useEffect(() => {
    getCertificates();
  }, []);

  return (
    <>
      <style>
        {`
          .MuiButtonBase-root {
            border: 1px solid var(--bg-secondary) !important;
          }
          .Mui-selected {
            background: var(--bg-secondary) !important;
          }
      `}
      </style>
      <h2 className="title">
        <BlurText
          text="LICENSES & CERTIFICATIONS"
          delay={90}
          animateBy="words"
          direction="top"
        />
      </h2>

      <div data-aos="fade-down" className="flex justify-center mb-10">
        <ToggleButtonGroup
          orientation="horizontal"
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            className="!text-white gap-3"
            value="slideshow"
            aria-label="slideshow"
          >
            <FaTv />
            Slide Show
          </ToggleButton>
          <ToggleButton
            className="!text-white gap-3"
            value="gridview"
            aria-label="gridview"
          >
            <FaBox />
            Grid View
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {view === "slideshow" ? (
        <SlideShow certificates={getCertificate} />
      ) : (
        <GridView certificates={getCertificate} />
      )}
    </>
  );
}

function SlideShow({ certificates }) {
  return (
    <div data-aos="fade-up">
      <Carousel
        className="2xl:w-full mx-auto w-[75%] md:w-[90%]"
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {certificates.map((item, i) => (
            <CarouselItem key={i}>
              <div className="p-1">
                <SpotlightCard
                  className="custom-spotlight-card relative  top-0 hover:-top-2 transition-all duration-300 ease-in-out !p-1"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <Card className="bg-transparent">
                    <CardContent className="flex flex-col md:flex-row items-center justify-center p-2 xl:p-6 gap-6 xl:gap-10">
                      <div className="w-full sm:w-1/2">
                        {item.img ? (
                          <img src={item.img} alt={item.title} />
                        ) : (
                          <div className="w-full h-[140px] bg-[var(--bg-primary)]">
                            <FaMedal size={80} color="#fff" />
                          </div>
                        )}
                      </div>

                      <div className="w-full">
                        <h4 className="text-center md:text-right !text-sm sm:!text-lg xl:!text-2xl uppercase text-[var(--text-secondary)] !mb-5">
                          {item.title}
                        </h4>
                        <div className="flex justify-between gap-8 items-center mb-">
                          <span className="text-xs xltext-md text-muted-foreground uppercase">
                            Provider:
                          </span>
                          <p className="text-xs sm:text-md xl:text-xl text-white font-medium uppercase truncate max-w-xl">
                            {item.provider}
                          </p>
                        </div>
                        <div className="flex justify-between gap-8 items-center mb-">
                          <span className="text-xs xltext-md text-muted-foreground uppercase">
                            Completed:
                          </span>
                          <p className="text-xs sm:text-md xl:text-xl text-white font-medium">
                            {item.completed}
                          </p>
                        </div>
                        <div className="flex justify-between gap-8 items-center mb-">
                          <span className="text-xs xl:text-md text-muted-foreground uppercase">
                            credential id:
                          </span>
                          <p className="text-xs xl:text-md text-muted-foreground truncate max-w-[80px] sm:max-w-[150px] lg:max-w-xl">
                            {item.credential_id}
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          asChild
                          className="text-center text-md xl:text-lg mt-5 py-4 xl:py-6 w-full hover:bg-[var(--bg-secondary)] hover:text-white"
                        >
                          <a href={item.link} target="_blank" rel="noopener">
                            <FaClipboardCheck />
                            Verify Credential
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function GridView({ certificates }) {
  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {certificates.map((item, i) => (
        <div key={i} data-aos="fade-up">
          <SpotlightCard
            className="custom-spotlight-card relative top-0 hover:-top-2 transition-all duration-300 ease-in-out !p-4"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div>
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.title}
                  className=" w-full h-[140xp]"
                />
              ) : (
                <div className="w-full h-[140px] bg-[var(--bg-primary)]">
                  <FaMedal size={80} />
                </div>
              )}

              <p className="my-4 text-sm truncate uppercase font-semibold text-[var(--text-secondary)]">
                {item.title}
              </p>

              <div className="mb-5">
                <div className="flex justify-between gap-8">
                  <span className="text-[10px] text-muted-foreground uppercase">
                    Provider:
                  </span>
                  <p className="text-sm font-medium uppercase truncate max-w-48">
                    {item.provider}
                  </p>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-[10px] text-muted-foreground uppercase">
                    Completed:
                  </span>
                  <p className="text-sm font-medium">{item.completed}</p>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-[10px] text-muted-foreground uppercase">
                    credential id:
                  </span>
                  <p className="text-xs text-muted-foreground truncate max-w-[100px] xl:max-w-40">
                    {item.cred_id}
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                asChild
                className="text-center w-full hover:bg-[var(--bg-secondary)] hover:text-white flex items-center gap-2 py-4 "
              >
                <a href={item.url} target="_blank" rel="noopener">
                  <FaClipboardCheck />
                  Verify Credential
                </a>
              </Button>
            </div>
          </SpotlightCard>
        </div>
      ))}
    </div>
  );
}

export default Certificates;
