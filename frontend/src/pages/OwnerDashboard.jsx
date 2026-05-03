import React, { useEffect, useState } from 'react';
import {
  getOwnerMachines,
  addMachine,
  deleteMachine,
  updateMachine
} from '../services/machineService';

const OwnerDashboard = () => {
  const [machines, setMachines] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    machine_name: '',
    description: '',
    category: '',
    rent_per_day: '',
    location: '',
    image: ''
  });

  useEffect(() => {
    fetchMachines();
  }, []);

  // 🔹 Fetch owner machines
  const fetchMachines = async () => {
    try {
      const res = await getOwnerMachines();
      if (res.data.status === "success") {
        setMachines(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching machines");
    }
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add or Update Machine
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMachine(editingId, form);
        alert("Machine updated");
        setEditingId(null);
      } else {
        await addMachine(form);
        alert("Machine added");
      }

      setForm({
        machine_name: '',
        description: '',
        category: '',
        rent_per_day: '',
        location: '',
        image: ''
      });

      fetchMachines();
    } catch (err) {
      alert("Operation failed");
    }
  };

  // 🔹 Edit machine
  const handleEdit = (machine) => {
    setForm(machine);
    setEditingId(machine.machine_id);
  };

  // 🔹 Delete machine
  const handleDelete = async (id) => {
    try {
      await deleteMachine(id);
      alert("Machine deleted");
      fetchMachines();
    } catch (err) {
      alert("Delete failed");
    }
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

          h2 {
            color: #38bdf8;
          }

          form {
            background: #1e293b;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          input {
            margin: 5px;
            padding: 10px;
            border-radius: 5px;
            border: none;
          }

          button {
            margin: 5px;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .add-btn {
            background: #38bdf8;
          }

          .card {
            background: #1e293b;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 10px;
          }

          .actions button {
            margin-right: 10px;
          }
        `}
      </style>

      <div className="container">
        <h2>Owner Dashboard</h2>

        {/* 🔹 Add / Update Form */}
        <form onSubmit={handleSubmit}>
          <input
            name="machine_name"
            placeholder="Machine Name"
            value={form.machine_name}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />
          <input
            name="rent_per_day"
            placeholder="Rent per day"
            value={form.rent_per_day}
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <button className="add-btn" type="submit">
            {editingId ? "Update Machine" : "Add Machine"}
          </button>
        </form>

        {/* 🔹 Machine List */}
        <h3>My Machines</h3>

        {machines.length === 0 ? (
          <p>No machines added yet</p>
        ) : (
          machines.map((m) => (
            <div key={m.machine_id} className="card">
              <h4>{m.machine_name}</h4>
              <p>{m.description}</p>
              <p>📍 {m.location}</p>
              <p>💰 ₹ {m.rent_per_day} / day</p>

              <div className="actions">
                <button onClick={() => handleEdit(m)}>Edit</button>
                <button onClick={() => handleDelete(m.machine_id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;