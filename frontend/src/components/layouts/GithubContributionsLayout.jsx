import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { FaGithub } from "react-icons/fa";

export default function GithubContributionsLayout() {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => currentYear - i,
  );

  const [year, setYear] = useState(currentYear);

  return (
    <section
      className="rounded-[32px] border border-white/10 !bg-[var(--bg-primary)] border-2 !p-8 wrap-1395 !-mt-0 sm:!-mt-[120px] relative z-10 top-0 hover:-top-5 hover:border-[var(--bg-secondary)]  transition-all
    duration-500
    ease-in-out"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 md:items-start justify-between mb-2 md:mb-8">
        <div className="flex gap-3">
          <FaGithub className="mt-1 text-2xl" />

          <div>
            <p className="text-gray-400 text-sm">GitHub contributions</p>

            <p className="text-xl font-bold">
              {year}{" "}
              <span className="text-[var(--text-secondary)]">
                Contributions
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex rounded-full bg-[#1b1b1f] p-1">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  year === y
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/Canulo21"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white"
          >
            View profile ↗
          </a>
        </div>
      </div>

      <div className="w-full git-calendar overflow-x-auto">
        <GitHubCalendar
          username="Canulo21"
          year={year}
          blockSize={16}
          blockMargin={5}
          fontSize={14}
          theme={{
            dark: ["#1a1a1a", "#7a1a00", "#b32400", "#e62e00", "#ff3300"],
          }}
        />
      </div>
    </section>
  );
}
