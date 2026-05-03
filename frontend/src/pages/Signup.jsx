import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'renter',
    location: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('auth/signup', form);

      if (res.data.status === "success") {
        alert("Signup successful!");
        navigate('/login');
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <>
      <style>
        {`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90vh;
            background: white;
          }

          .form-box {
            background: #1e293b;
            padding: 30px;
            border-radius: 10px;
            width: 350px;
            box-shadow: 0 5px 20px rgba(229, 232, 235, 0.4);
          }

          .form-box h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #38bdf8;
          }

          input, select {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border-radius: 5px;
            border: none;
            outline: none;
          }

          button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            background: #38bdf8;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
          }

          button:hover {
            background: #0ea5e9;
          }
        `}
      </style>

      <div className="container">
        <form className="form-box" onSubmit={handleSignup}>
          <h2>Signup</h2>

          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required />

          <select name="role" onChange={handleChange}>
            <option value="renter">Renter</option>
            <option value="owner">Owner</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Signup;