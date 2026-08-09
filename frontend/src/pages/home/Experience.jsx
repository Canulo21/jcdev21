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

const experiences = [
  {
    company: "24 Creative Media Solutions Inc.",
    address: "Alabang, Montinlupa City, Philippines",
    icon: <LaptopMacIcon />,
    roles: [
      {
        title: "Mid-Level Web Developer",
        duration: "2023 - present",
        descriptions: [
          {
            li: "Built dynamic websites using Advanced Custom Fields (ACF), custom post types, and custom taxonomies.",
          },
          {
            li: "Implemented basic SEO best practices (meta tags, schema, image optimization).",
          },
          {
            li: "Optimized website performance by improving Core Web Vitals, image loading, caching, and asset delivery.",
          },
        ],
      },
      {
        title: "Junior Web Developer",
        duration: "2021 - 2023",
        descriptions: [
          {
            li: "Converted UI designs into fully responsive WordPress websites using HTML, CSS, JavaScript, jQuery, and PHP",
          },
          {
            li: "Performed website maintenance, bug fixes, plugin updates, and content management",
          },
          {
            li: "Resolved CSS, layout, and responsive design issues across desktop, tablet, and mobile devices",
          },
        ],
      },
    ],
  },
  {
    company: "Benpos System",
    address: "Don Anselmo Bernad Avenue, Ozamiz City Misamis Occidental",
    icon: <LaptopMacIcon />,
    roles: [
      {
        title: "Programmer",
        duration: "2021 - 2021",
        descriptions: [
          {
            li: "Experienced in hardware installation, CCTV setup, RJ45 crimping, and basic network configuration",
          },
          {
            li: "Maintained and enhanced legacy applications using C# and MySQL",
          },
        ],
      },
    ],
  },
];

export default function Experience() {
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

      <Timeline
        position="alternate"
        className="
    !px-0 sm:!px-4
    [&>li]:!flex-col
    sm:[&>li:nth-child(odd)]:!flex-row
    sm:[&>li:nth-child(even)]:!flex-row-reverse
    [&>li>div]:!text-center
    sm:[&>li:nth-child(odd)>div]:!text-right
    sm:[&>li:nth-child(even)>div]:!text-left
  "
      >
        {experiences.map((experience, index) => (
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
              {experience.company}
              <Typography
                variant="body2"
                className="text-muted-foreground !font-medium !text-xs"
              >
                {experience.address}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator
              data-aos="fade-up"
              className=" w-fit sm:w-auto mx-auto"
            >
              <TimelineConnector />
              <TimelineDot className="!bg-[var(--bg-secondary)] ">
                {experience.icon}
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
                {experience.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="mb-4 text-left">
                    <Typography variant="h6" component="span">
                      {role.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted-foreground !font-medium !text-xs"
                    >
                      {role.duration}
                    </Typography>
                    <ul className="mt-5 list-disc">
                      {role.descriptions?.map((li, i) => (
                        <li key={i} className="text-sm mt-4 text-white/70">
                          {li.li}
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
    </>
  );
}
