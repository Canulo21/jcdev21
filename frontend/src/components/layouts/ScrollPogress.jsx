import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress = (scrollTop / documentHeight) * 100;

      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Progress
      value={progress}
      aria-label="Page scroll progress"
      className="fixed top-0 left-0 z-[9999] h-1 w-full rounded-none bg-transparent"
    />
  );
}
