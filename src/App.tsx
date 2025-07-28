import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
