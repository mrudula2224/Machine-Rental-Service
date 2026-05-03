import React, { useEffect, useState } from 'react';
import { getMyBookings, cancelBooking } from '../services/bookingService';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await getMyBookings();
    if (res.data.status === "success") {
      setBookings(res.data.data);
    }
  };

  const handleCancel = async (id) => {
    await cancelBooking(id);
    fetchBookings();
  };

  return (
    <>
      <style>
        {`
          .container {
            padding: 20px;
            background: #0f172a;
            color: white;
            min-height: 100vh;
          }

          .card {
            background: #1e293b;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
          }

          .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);

          display: flex;
          justify-content: center;
          align-items: center;
          }

      .modal-box {
         background: #1e293b;
         padding: 20px;
         border-radius: 10px;
         color: white;
        width: 300px;
         }
        `}
      </style>

      <div className="container">
        <h2>My Bookings</h2>

        {bookings.map((b) => (
          <div key={b.booking_id} className="card">
            <p>Machine Name: {b.machine_name}</p>
            <p>From: {b.from_date}</p>
            <p>To: {b.to_date}</p>
            <p>Status: {b.status}</p>

            {b.status === "pending" && (
              <button onClick={() => handleCancel(b.booking_id)}>
                Cancel
              </button>
            )}
            <button onClick={() => setSelected(b)}>
            View Details
           </button>
          </div>
        ))}

        {selected && (
  <div className="modal">
    <div className="modal-box">
      <h3>Owner Details</h3>

      <p><strong>Name:</strong> {selected.owner_name}</p>
      <p><strong>Contact:</strong> {selected.owner_contact}</p>
      <p><strong>Location:</strong> {selected.machine_location}</p>
      <p><strong>Status:</strong> {selected.status}</p>

      <button onClick={() => setSelected(null)}>Close</button>
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default MyBookings;