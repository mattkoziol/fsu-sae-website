// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Philanthropy from './pages/Philanthropy';
import Highlights from './pages/Highlights';
import Merch from './pages/Merch';
import ActiveMembers from './pages/members/ActiveMembers';
import Alumni from './pages/members/Alumni';
import ExecutiveBoard from './pages/members/ExecutiveBoard';
import Login from './pages/Login';
import AccountSettings from './pages/AccountSettings';
import AlumniAccountSettings from './pages/AlumniAccountSettings';
import VerifyAccount from './pages/VerifyAccount';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/philanthropy" element={<Philanthropy />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/members/active" element={<ActiveMembers />} />
        <Route path="/members/alumni" element={<Alumni />} />
        <Route path="/members/exec" element={<ExecutiveBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/alumni-account" element={<AlumniAccountSettings />} />
        <Route path="/verify" element={<VerifyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
