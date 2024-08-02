import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import EmployeeDetail from './Components/EmployeeDetail';
import Navbar from './Components/Navbar';
 

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;