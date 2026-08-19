import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Typography from "@mui/material/Typography";
import BlurText from "@/components/layouts/utils/BlurText";
import SpotlightCard from "@/components/layouts/utils/SpotlightCard";
import { useEffect, useState } from "react";
import apiFetch from "@/lib/api";
import { FaGlobe } from "react-icons/fa";

export default function Experience() {
  const [getCompany, setGetCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCompanies = async () => {
    try {
      const data = await apiFetch("companies");

      setGetCompany(data);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <h2 className="title">
        <BlurText
          text="Work Experience"
          delay={90}
          animateBy="words"
          direction="top"
        />
      </h2>

      {isLoading ? (
        <div
          data-aos="fade-up"
          className="flex items-center flex-col justify-center"
        >
          <span className="loader-cup "></span>
          <span className="loader-text">Load ng</span>
        </div>
      ) : (
        <div className="overflow-hidden">
          <Timeline
            position="alternate"
            className="
    !px-0 sm:!px-4
    [&>li]:!flex-col
    
    [&>li_.holder-link]:justify-center
    sm:[&>li:nth-child(odd)_.holder-link]:justify-end
    sm:[&>li:nth-child(even)_.holder-link]:justify-start
    sm:[&>li:nth-child(odd)]:!flex-row
    sm:[&>li:nth-child(even)]:!flex-row-reverse
    [&>li>div]:!text-center
    sm:[&>li:nth-child(odd)>div]:!text-right
    sm:[&>li:nth-child(even)>div]:!text-left
  "
          >
            {getCompany.map((company, index) => (
              <TimelineItem key={index} className=" mt-5 sm:mt-0">
                <TimelineOppositeContent
                  data-aos="fade-right"
                  align="right"
                  variant="h4"
                  className="!text-2xl lg:!text-4xl text-[var(--text-secondary)] !px-0 sm:!px-4 !font-semibold "
                  sx={{
                    m: "auto 0",
                  }}
                >
                  {company.company_name}
                  <Typography className="text-muted-foreground !font-medium !text-xs !mt-2">
                    {company.company_addresse}
                  </Typography>
                  {company.company_website ? (
                    <Typography className="text-muted-foreground !font-medium !text-xs !mt-2">
                      <div className="holder-link flex">
                        <a
                          href={company.company_website}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-2  w-fit hover:text-[var(--text-secondary)]"
                        >
                          <FaGlobe /> Website
                        </a>
                      </div>
                    </Typography>
                  ) : null}
                </TimelineOppositeContent>
                <TimelineSeparator
                  data-aos="fade-up"
                  className=" w-fit sm:w-auto mx-auto"
                >
                  <TimelineConnector />
                  <TimelineDot className="!bg-[var(--bg-secondary)] ">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ py: "12px", px: 2 }}
                  data-aos="fade-left"
                  className="!px-0 sm:!px-4"
                >
                  <SpotlightCard
                    className="custom-spotlight-card "
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    {[...company.experiences].reverse().map((role, i) => (
                      <div key={role.id ?? i} className="mb-4 text-left">
                        <Typography variant="h6" component="span">
                          {role.position}
                        </Typography>

                        <Typography
                          variant="body2"
                          className="text-muted-foreground !font-medium !text-xs"
                        >
                          {role.duration}
                        </Typography>

                        <ul className="mt-5 list-disc pl-5">
                          {role.description.split("\\n").map((item, index) => (
                            <li
                              className="text-sm mt-4 text-white/70"
                              key={index}
                            >
                              {item.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </SpotlightCard>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      )}
    </>
  );
}
