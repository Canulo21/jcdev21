import React from "react";
import BlurText from "../../components/layouts/utils/BlurText";

function Projects() {
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
    </>
  );
}

export default Projects;
