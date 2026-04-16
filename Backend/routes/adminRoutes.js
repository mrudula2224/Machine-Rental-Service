const express = require('express');
const router = express.Router();

const pool = require('../Database/pool');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const result = require('../utils/result');
const config = require('../utils/config');

const {verifyToken, checkRole} = require('../middleware/authMiddleware');

// ADMIN LOGIN

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send(result.createResult("Username and password required"));
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const sql = "SELECT * FROM admin WHERE username=? AND password=?";

    pool.query(sql, [username, hashedPassword], (err, data) => {
        if (err) return res.send(result.createResult(err));

        if (data.length === 0) {
            return res.send(result.createResult("Invalid admin credentials"));
        }

        const admin = data[0];

        const token = jwt.sign(
            { admin_id: admin.admin_id, role: "admin" },
            config.SECRET,
            { expiresIn: '1d' }
        );

        res.send(result.createResult(null, { admin, token }));
    });
});

// View All Users
router.get('/users', verifyToken, checkRole('admin'), (req, res) => {
    pool.query("SELECT * FROM users", (err, data) => {
        if (err) return res.send(result.createResult(err));
        res.send(result.createResult(null, data));
    });
});

//View All Machines
router.get('/machines', verifyToken, checkRole('admin'), (req, res) => {
    pool.query("SELECT * FROM machines", (err, data) => {
        if (err) return res.send(result.createResult(err));
        res.send(result.createResult(null, data));
    });
});

//View All Bookings
router.get('/bookings', verifyToken, checkRole('admin'), (req, res) => {
    pool.query("SELECT * FROM bookings", (err, data) => {
        if (err) return res.send(result.createResult(err));
        res.send(result.createResult(null, data));
    });
});

//Delete user
router.delete('/users/:id', verifyToken, checkRole('admin'), (req, res) => {
    pool.query("DELETE FROM users WHERE user_id=?", [req.params.id], (err) => {
        if (err) return res.send(result.createResult(err));
        res.send(result.createResult(null, "User deleted"));
    });
});

//Delete machine
router.delete('/machines/:id', verifyToken, checkRole('admin'), (req, res) => {
    pool.query("DELETE FROM machines WHERE machine_id=?", [req.params.id], (err) => {
        if (err) return res.send(result.createResult(err));
        res.send(result.createResult(null, "Machine deleted"));
    });
});


module.exports = router;