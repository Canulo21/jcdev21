import React from "react";
import RippleGrid from "./utils/RippleGrid";
import TextType from "./utils/TextType";
import WarpText from "./utils/WarpText";
import me from "../../assets/images/jc-hd.webp";
import { Button } from "../ui/button";
import { FaFileDownload } from "react-icons/fa";

function BannerLayout() {
  return (
    <div>
      <div className="relative  w-full h-full pt-[60px] lg:pt-0 lg:h-[90vh] overflow-hidden ">
        <div className="absolute top-0 left-0 w-full h-full z-[2]">
          <RippleGrid
            enableRainbow={false}
            gridColor="#ff3300"
            rippleIntensity={0.05}
            gridSize={10}
            gridThickness={25}
            mouseInteraction
            mouseInteractionRadius={0.8}
            opacity={0.3}
            fadeDistance={1.8}
            vignetteStrength={3}
            glowIntensity={0.55}
            gridRotation={0}
          />
        </div>

        <div className="  m-auto w-[95%] 2xl:w-[1395px] h-full flex-col lg:flex-row flex items-center justify-center gap-5 xl:gap-20 text-center lg:text-left text-white overflow-hidden">
          <div className="relative z-[5] lg:top-[-150px]">
            <p className="text-3xl sm:text-4xl font-bold ">Hi, I'm</p>
            <WarpText
              className="  !min-h-[95px]  sm:!min-h-[130px]"
              text="Jhon Carlo < / >"
              warpIntensity={0.1}
              fontFamily="inherit"
              fontSize={100}
              warpSpeed={0.05}
            />

            <TextType
              className="text-xl md:text-2xl text-[var(--font-primary)] font-semibold text-[var(--text-secondary)]  "
              text={[
                "Frontend Developer",
                "React Enthusiast",
                "WordPress Web Developer",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              variableSpeed={false}
              cursorBlinkDuration={0.5}
            />

            <p className="text-sm md:text-lg text-muted-foreground  mt-6 ">
              As a passionate self-taught front-end developer, I'm driven by
              curiosity and a love for crafting intuitive, responsive web
              experiences. My journey is fueled by continuous learning and a
              deep commitment to mastering the art of web design.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Button
                asChild
                className="mt-6 border-2  text-md py-6 px-6 border-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)] flex item-center gap-2 w-fit"
              >
                <a href="#">
                  Donwload CV <FaFileDownload />
                </a>
              </Button>
            </div>
          </div>

          <img
            src={me}
            alt="Jhon Carlo Canulo"
            fetchPriority="high"
            loading="eager"
            className="relative z-[5]  w-[60%] lg:w-[45%] brightness-85 saturate-80"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerLayout;
