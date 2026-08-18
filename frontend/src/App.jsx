import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/home/Home";
import NotFoundPageLayout from "./components/layouts/NotFoundPageLayout";
import Login from "./admin/Login";
import DashboardIndex from "./admin/dashboard/DashboardIndex";
import AdminDashboardLayout from "./components/layouts/AdminDashboardLayout";
import ProjectIndex from "./admin/dashboard/ProjectIndex";
import CertificateIndex from "./admin/dashboard/CertificateIndex";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Login */}
        <Route path="/jc-login" element={<Login />} />

        {/* Dashboard */}
        <Route element={<AdminDashboardLayout />}>
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/projects" element={<ProjectIndex />} />
          <Route path="/certificates" element={<CertificateIndex />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPageLayout />} />
      </Routes>
    </>
  );
}

export default App;
