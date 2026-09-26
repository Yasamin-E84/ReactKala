import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import "leaflet/dist/leaflet.css";

import AddressProvider from "./Context/AddressProvider";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";

const routerBase = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <AddressProvider>
      <BrowserRouter basename={routerBase}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </AddressProvider>
  </StrictMode>,
);
