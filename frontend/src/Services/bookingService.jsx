import API from './api';

// 🔹 Renter
export const createBooking = (data) =>
  API.post('/bookings', data);

export const getMyBookings = () =>
  API.get('/bookings/renter/my');

export const cancelBooking = (id) =>
  API.put(`/bookings/cancel/${id}`);

// 🔹 Owner (use later)
export const getOwnerBookings = () =>
  API.get('/bookings/owner/my');

export const updateBookingStatus = (id, status) =>
  API.put(`/bookings/${id}`, { status });
