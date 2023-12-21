import React from "react";
import RegistrationPage from "./components/pages/RegistrationPage";
import MainPage from "./components/pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from "./components/pages/ProductPage";
import CategoriesPage from "./components/pages/CategoriesPage";
import ParserPage from "./components/pages/ParserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/reg" element={<RegistrationPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/parser" element={<ParserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
