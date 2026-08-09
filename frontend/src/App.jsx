import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/home/Home";
import Skills from "./pages/home/Skills";

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
        <Route path="/skills" element={<Skills />} />
      </Route>
    </Routes>
  );
}

export default App;
