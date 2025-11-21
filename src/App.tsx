import React from 'react';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductDetail from './pages/ProductDetail';
import Favorite from './pages/Favorite';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path="/favorite" element = {<Favorite/>} />
        <Route path="/cart" element = {<Cart/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
