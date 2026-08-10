import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Certificates from "./Certificates";

function Home() {
  return (
    <>
      <section id="projects" className="wrap-1395">
        <Projects />
      </section>

      <section id="skills" className="wrap-1395">
        <Skills />
      </section>

      <section id="experience" className="wrap-1395">
        <Experience />
      </section>

      <section id="certifications" className="wrap-1395">
        <Certificates />
      </section>
    </>
  );
}

export default Home;
