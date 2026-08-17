import { Separator } from "@/components/ui/separator";
import apiFetch from "@/lib/api";
import React, { useEffect, useState } from "react";
import { FaCode, FaNewspaper, FaWordpress } from "react-icons/fa";

function DashboardIndex() {
  const [totalWPProj, setTotalWPProj] = useState(0);
  const [totalFullStack, setTotalFullStack] = useState(0);
  const [totalFrontend, setTotalFrontend] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);

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
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    }
  };

  const getCertificates = async () => {
    try {
      const data = await apiFetch("certifications");
      setTotalCertificates(data.length);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    }
  };

  useEffect(() => {
    getProjects();
    getCertificates();
  }, []);

  return (
    <>
      <h1 className="!mb-15">Welcom Master JC!</h1>

      <h6>Projects</h6>
      <div className="grid grid-cols-3 [&>div]:border-2 [&>div]:rounded-lg [&>div]:overflow-hidden gap-4  mt-6">
        <div className="flex items-normal">
          <div className="flex flex-col items-center gap-2 w-[20%] bg-red-600 text-white justify-center">
            <FaWordpress size={30} />
            <p className="font-medium">WordPress</p>
          </div>
          <div className="p-6 ">
            <p className="text-4xl font-medium">{totalWPProj}</p>
          </div>
        </div>
        <div className="flex items-normal">
          <div className="flex flex-col items-center gap-2 w-[20%] bg-red-700 justify-center text-white">
            <FaCode size={30} />
            <p className="font-medium">Frontend</p>
          </div>
          <div className="p-6 ">
            <p className="text-4xl font-medium">{totalFrontend}</p>
          </div>
        </div>
        <div className="flex items-normal">
          <div className="flex flex-col items-center gap-2 w-[20%] bg-red-900 justify-center text-white">
            <FaCode size={30} />
            <p className="font-medium">Fullstack</p>
          </div>
          <div className="p-6 ">
            <p className="text-4xl font-medium">{totalFullStack}</p>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <h6>Certificates</h6>
      <div className="grid grid-cols-3 [&>div]:border-2 [&>div]:rounded-lg [&>div]:overflow-hidden gap-4  mt-6">
        <div className="flex items-normal">
          <div className="flex flex-col items-center gap-2 w-[20%] bg-red-600 text-white justify-center">
            <FaNewspaper size={30} />
            <p className="font-medium">Certificates</p>
          </div>
          <div className="p-6 ">
            <p className="text-4xl font-medium">{totalCertificates}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardIndex;
