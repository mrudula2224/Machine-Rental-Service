const express = require('express');
const router = express.Router();

const pool = require('../Database/pool');
const result = require('../utils/result');

const { verifyToken, checkRole } = require('../middleware/authMiddleware');



//  CREATE BOOKING (RENTER ONLY)

router.post('/', verifyToken, checkRole('renter'), (req, res) => {
    const { machine_id, from_date, to_date } = req.body;

    if (!machine_id || !from_date || !to_date) {
        return res.send(result.createResult("All fields are required"));
    }

    const renter_id = req.user.user_id;

    // Step 1: Get owner_id from machine
    const machineSql = "SELECT owner_id FROM machines WHERE machine_id = ?";

    pool.query(machineSql, [machine_id], (err, machineData) => {
        if (err) return res.send(result.createResult(err));

        if (machineData.length === 0) {
            return res.send(result.createResult("Machine not found"));
        }

        const owner_id = machineData[0].owner_id;

        // Step 2: Insert booking
        const insertSql = `
            INSERT INTO bookings (machine_id, renter_id, owner_id, from_date, to_date)
            VALUES (?, ?, ?, ?, ?)
        `;

        pool.query(insertSql, [machine_id, renter_id, owner_id, from_date, to_date], (err) => {
            if (err) return res.send(result.createResult(err));

            res.send(result.createResult(null, "Booking requested successfully"));
        });
    });
});



// VIEW MY BOOKINGS (RENTER)

router.get('/renter/my', verifyToken, checkRole('renter'), (req, res) => {
    const renter_id = req.user.user_id;

    const sql = "SELECT * FROM bookings WHERE renter_id = ?";

    pool.query(sql, [renter_id], (err, data) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, data));
    });
});



//  OWNER VIEW BOOKINGS

router.get('/owner/my', verifyToken, checkRole('owner'), (req, res) => {
    const owner_id = req.user.user_id;

    const sql = "SELECT * FROM bookings WHERE owner_id = ?";

    pool.query(sql, [owner_id], (err, data) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, data));
    });
});



// APPROVE / REJECT BOOKING (OWNER)

router.put('/:id', verifyToken, checkRole('owner'), (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.send(result.createResult("Status is required"));
    }

    const sql = "UPDATE bookings SET status = ? WHERE booking_id = ?";

    pool.query(sql, [status, id], (err) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, "Booking status updated"));
    });
});



//  CANCEL BOOKING (RENTER)

router.put('/cancel/:id', verifyToken, checkRole('renter'), (req, res) => {
    const { id } = req.params;

    const sql = "UPDATE bookings SET status = 'cancelled' WHERE booking_id = ?";

    pool.query(sql, [id], (err) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, "Booking cancelled"));
    });
});


module.exports = router;