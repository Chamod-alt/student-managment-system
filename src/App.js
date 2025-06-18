import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rejister from './pages/Rejister';
import Studentlist from './pages/Studentlist';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Studentlist />} />
          <Route path="/register" element={<Rejister />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
