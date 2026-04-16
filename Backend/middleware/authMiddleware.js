const jwt = require('jsonwebtoken')
const config = require('../utils/config')

// verify token
const verifyToken = (req, res, next) => {
   const token = req.headers['authorization'];
   
   if(!token){
    return res.send({status: "error", error: "token required"});

   }

   try{
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded; // containing user_id + role
    next();
   }
   catch(err){
    return res.send({ status: "error", error: "Invalid Token"});

   }
};

//check th role
const checkRole = (role) =>{
    return (req, res, next) => {
        if(req.user.role != role){
            return res.send({ststus: "error", error: "Access Denied"});
        }
        next();
    };
};

module.exports = { verifyToken, checkRole};
