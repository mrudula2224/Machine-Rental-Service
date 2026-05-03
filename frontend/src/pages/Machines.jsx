import React, { useEffect, useState } from 'react';
import { getMachines } from '../services/machineService';
import { createBooking } from '../services/bookingService';

const Machines = () => {
  const [machines, setMachines] = useState([]);
  const [search, setSearch] = useState("");


  const fetchMachines = async () => {
  const res = await getMachines(search);

  if (res.data.status === "success") {
    setMachines(res.data.data);
  }
};


  useEffect(() => {
  fetchMachines();
}, [search]);

  
  

const handleBook = async (machineId, ownerId) => {
  const from_date = prompt("Enter start date (YYYY-MM-DD)");
  const to_date = prompt("Enter end date (YYYY-MM-DD)");

  if (!from_date || !to_date) return;

  try {
    await createBooking({
      machine_id: machineId,
      owner_id: ownerId,
      from_date,
      to_date
    });

    alert("Booking request sent!");
  } catch (err) {
    alert("Booking failed");
  }
};

  return (
    <>
      <style>
        {`
          .container {
            padding: 30px;
            background: #0f172a;
            min-height: 100vh;
            color: white;
          }

          .title {
            font-size: 24px;
            margin-bottom: 20px;
            color: #38bdf8;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }

          .card {
            background: #1e293b;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transition: 0.3s;
          }

          .card:hover {
            transform: translateY(-5px);
          }

          .name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .price {
            color: #38bdf8;
            margin-top: 10px;
          }

          input {
          padding: 10px;
          width: 260px;
          border-radius: 6px;
          border: none;
          margin-bottom: 20px;
          }
        `}
      </style>

      <div className="container">
        <div className="title">Available Machines</div>

        <input
  type="text"
  placeholder="🔍 Search machines..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <div className="grid">
          {machines.map((m) => (
            <div className="card" key={m.machine_id}>
              <div className="name">{m.machine_name}</div>
              <div>{m.description}</div>
              <div>📍 {m.location}</div>
              <div className="price">₹ {m.rent_per_day} / day</div>
              <button onClick={() => handleBook(m.machine_id, m.owner_id)}>
              Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Machines;