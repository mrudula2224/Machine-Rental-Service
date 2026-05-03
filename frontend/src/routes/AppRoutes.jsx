import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Machines from '../pages/Machines';
import OwnerDashboard from '../pages/OwnerDashboard';
import MyBookings from '../pages/MyBooking';
import OwnerBookings from '../pages/OwnerBookings';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/machines" element={<Machines />} />
      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path='/owner/bookings' element= {<OwnerBookings />} />
    </Routes>
  );
};

export default AppRoutes;