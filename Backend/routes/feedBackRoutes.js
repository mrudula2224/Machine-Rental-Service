const express = require('express');
const router = express.Router();

const pool = require('../Database/pool');
const result = require('../utils/result');

const { verifyToken, checkRole } = require('../middleware/authMiddleware');



//  ADD FEEDBACK (RENTER ONLY)

router.post('/', verifyToken, checkRole('renter'), (req, res) => {
    const { machine_id, rating, comment } = req.body;
    const renter_id = req.user.user_id;

    if (!machine_id || !rating) {
        return res.send(result.createResult("Machine ID and rating are required"));
    }

    // rating validation (1–5)
    if (rating < 1 || rating > 5) {
        return res.send(result.createResult("Rating must be between 1 and 5"));
    }

    const sql = `
        INSERT INTO feedback (machine_id, renter_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;

    pool.query(sql, [machine_id, renter_id, rating, comment], (err) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, "Feedback added successfully"));
    });
});



//  GET FEEDBACK FOR A MACHINE (PUBLIC)

router.get('/:machine_id', (req, res) => {
    const { machine_id } = req.params;

    const sql = `
        SELECT f.*, u.name 
        FROM feedback f
        JOIN users u ON f.renter_id = u.user_id
        WHERE f.machine_id = ?
    `;

    pool.query(sql, [machine_id], (err, data) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, data));
    });
});


module.exports = router;