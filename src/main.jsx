import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import "leaflet/dist/leaflet.css";

import AddressProvider from "./Context/AddressProvider";
import Header from "./components/Header/Header";
import DesktopCategories from "./components/Header/DesktopCategories";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import { PageLoadSequence, ProgressiveSection } from "./components/Loader/PageLoadSequence";

const routerBase = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <AddressProvider>
      <PageLoadSequence>
        <BrowserRouter basename={routerBase}>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/*" element={<DesktopCategories />} />
          </Routes>

          <ProgressiveSection order={24} minHeight="0">
            <Footer />
          </ProgressiveSection>
        </BrowserRouter>
      </PageLoadSequence>
    </AddressProvider>
  </StrictMode>,
);
