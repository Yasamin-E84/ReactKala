import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import "leaflet/dist/leaflet.css";

import AddressProvider from "./Context/AddressProvider";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <AddressProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AddressProvider>
  </StrictMode>,
);