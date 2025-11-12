import React from 'react';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path="/cart" element = {<Cart/>} />
      </Routes>
    </Router>
  );
}

export default App;
