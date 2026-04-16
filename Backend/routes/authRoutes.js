const express = require('express')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../Database/pool')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router();

// ====Signup====
router.post('/signup',(req,res) => {
    const { name, email, password, phone, role, location} = req.body;

    if(!name || !email || !password || !phone || !role || !location){
        return res.send(result.createResult("Required Fields missing"));
    }

    //encrypt the pssword
    const hashedPassword = CryptoJS.SHA256(password).toString();
    //check if user already exists
    const sql = "SELECT email from users WHERE email=?";
    pool.query(sql, [email], (err, data) => {
        if(err) return res.send(result.createResult(err));

        if(data.length > 0){
            return res.send(result.createResult("user already exists"));
        }

        //insert new user into database
        const insertSql =` INSERT INTO users (name, email, password, phone, role, location) VALUES (?, ?, ?, ?, ?, ?)`;

        pool.query(insertSql,[name, email, hashedPassword, phone, role, location],(err) =>{
            if(err) return res.send(result.createResult(err));

            res.send(result.createResult(null, "User registered"));

        });


    });
});

// ====login====

router.post('/login',(req, res) => {
     console.log("BODY:", req.body);
    const{email, password} = req.body;
  

    if(!email || !password) {
        return res.send(result.createResult("Email and password required."));
    }
    //encrypt the pssword
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const sql = `
    SELECT user_id, name, email, role, phone, location
    FROM users 
    WHERE email =? AND password = ?
    LIMIT 1`;

    pool.query(sql, [email, hashedPassword] ,(err, data) => {
        if(err) return res.send(result.createResult(err));

        if(data.length ==0){
            return res.send(result.createResult("Invalid Credentials"));
        }

        const user = data[0];

        const token = jwt.sign(
            {user_id: user.user_id, role: user.role},
            config.SECRET,
            { expiresIn : '1d'}
        );

         res.send(result.createResult(null, {
            user: user,
            token: token
        }));

    });
});

module.exports = router;