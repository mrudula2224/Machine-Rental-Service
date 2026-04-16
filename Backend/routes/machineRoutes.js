const express = require('express');
const router = express.Router();

const pool = require('../Database/pool');
const result = require('../utils/result');

const { verifyToken, checkRole } = require('../middleware/authMiddleware');



// ADD MACHINE (OWNER ONLY)

router.post('/', verifyToken, checkRole('owner'), (req, res) => {
    const { machine_name, description, category, rent_per_day, location } = req.body;

    if (!machine_name || !rent_per_day) {
        return res.send(result.createResult("Machine name and rent are required"));
    }

    const owner_id = req.user.user_id;

    const sql = `
        INSERT INTO machines (owner_id, machine_name, description, category, rent_per_day, location)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    pool.query(sql, [owner_id, machine_name, description, category, rent_per_day, location], (err) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, "Machine added successfully"));
    });
});



//  GET ALL MACHINES (PUBLIC)

router.get('/', (req, res) => {
    const sql = "SELECT * FROM machines WHERE availability = TRUE";

    pool.query(sql, (err, data) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, data));
    });
});



// GET MACHINE BY ID

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM machines WHERE machine_id = ?";

    pool.query(sql, [id], (err, data) => {
        if (err) return res.send(result.createResult(err));

        if (data.length === 0) {
            return res.send(result.createResult("Machine not found"));
        }

        res.send(result.createResult(null, data[0]));
    });
});



//  GET OWNER'S MACHINES

router.get('/owner/my', verifyToken, checkRole('owner'), (req, res) => {
    const owner_id = req.user.user_id;

    const sql = "SELECT * FROM machines WHERE owner_id = ?";

    pool.query(sql, [owner_id], (err, data) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, data));
    });
});



//  UPDATE MACHINE (OWNER ONLY)

router.put('/:id', verifyToken, checkRole('owner'), (req, res) => {
    const { id } = req.params;
    const { machine_name, description, category, rent_per_day, location } = req.body;

    const sql = `
        UPDATE machines 
        SET machine_name=?, description=?, category=?, rent_per_day=?, location=?
        WHERE machine_id=?
    `;

    pool.query(sql, [machine_name, description, category, rent_per_day, location, id], (err) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, "Machine updated successfully"));
    });
});



//  DELETE MACHINE (OWNER ONLY)

router.delete('/:id', verifyToken, checkRole('owner'), (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM machines WHERE machine_id = ?";

    pool.query(sql, [id], (err) => {
        if (err) return res.send(result.createResult(err));

        res.send(result.createResult(null, "Machine deleted successfully"));
    });
});


module.exports = router;