import React, { useState, useContext } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', form);

      if (res.data.status === "success") {
        const { user, token } = res.data.data;

        // 🔥 Save in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // 🔥 Update context
        setUser(user);

        alert("Login successful!");

        // 🔥 Role-based redirect
        if (user.role === 'owner') {
          navigate('/owner/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'renter') {
          navigate('/renter/dashboard');
        } else {
         navigate('/');
        }

      } else {
        alert(res.data.error);
      }

    } catch (err) {
      alert("Login failed");
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
            box-shadow: 0 5px 20px rgba(0,0,0,0.4);
          }

          .form-box h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #38bdf8;
          }

          input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: none;
            outline: none;
          }

          button {
           width: 70%;
           display: block;  /* Essential for margin auto to work */
           margin: 10px auto 0; /* Centers horizontally and sets top margin */
           padding: 10px;
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
        <form className="form-box" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;