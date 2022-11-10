import React from 'react';
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RestaurantPage from './components/RestaurantPage';

function App() {
  return (
    <Router>
    <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path="/RestaurantPage/:id" element={<RestaurantPage />} />
    </Routes>
  </Router>
  );
}

export default App;
