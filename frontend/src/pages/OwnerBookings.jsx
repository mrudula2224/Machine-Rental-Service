import React, { useEffect, useState } from 'react';
import {
  getOwnerBookings,
  updateBookingStatus
} from '../services/bookingService';

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await getOwnerBookings();
    if (res.data.status === "success") {
      setBookings(res.data.data);
    }
  };

  const handleStatus = async (id, status) => {
    await updateBookingStatus(id, status);
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

          button {
            margin-right: 10px;
            padding: 6px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .approve {
            background: green;
            color: white;
          }

          .reject {
            background: red;
            color: white;
          }
        `}
      </style>

      <div className="container">
        <h2>Booking Requests</h2>

        {bookings.length === 0 ? (
          <p>No booking requests</p>
        ) : (
          bookings.map((b) => (
            <div key={b.booking_id} className="card">
              <p><strong>Machine:</strong> {b.machine_name}</p>
              <p><strong>Renter :</strong> {b.renter_name}</p>
              <p><strong>From:</strong> {b.from_date}</p>
              <p><strong>To:</strong> {b.to_date}</p>
              <p><strong>Status:</strong> {b.status}</p>

              {b.status === "pending" && (
                <>
                  <button
                    className="approve"
                    onClick={() => handleStatus(b.booking_id, 'approved')}
                  >
                    Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() => handleStatus(b.booking_id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OwnerBookings;