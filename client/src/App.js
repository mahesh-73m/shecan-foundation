import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Admin from './components/Admin';
import Register from './components/Register';

import './App.css';


function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;