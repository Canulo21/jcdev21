import { Separator } from "@/components/ui/separator";
import React from "react";
import { FaCode, FaNewspaper, FaWordpress } from "react-icons/fa";

function DashboardIndex() {
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
            <p className="text-4xl font-medium">15</p>
          </div>
        </div>
        <div className="flex items-normal">
          <div className="flex flex-col items-center gap-2 w-[20%] bg-red-700 justify-center text-white">
            <FaCode size={30} />
            <p className="font-medium">Frontend</p>
          </div>
          <div className="p-6 ">
            <p className="text-4xl font-medium">15</p>
          </div>
        </div>
        <div className="flex items-normal">
          <div className="flex flex-col items-center gap-2 w-[20%] bg-red-900 justify-center text-white">
            <FaCode size={30} />
            <p className="font-medium">Fullstack</p>
          </div>
          <div className="p-6 ">
            <p className="text-4xl font-medium">15</p>
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
            <p className="text-4xl font-medium">15</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardIndex;
