import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/home/Home";
import NotFoundPageLayout from "./components/layouts/NotFoundPageLayout";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPageLayout />} />
    </Routes>
  );
}

export default App;
