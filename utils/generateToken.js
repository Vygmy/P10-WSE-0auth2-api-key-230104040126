// utils/generateToken.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; 

const generateToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role: role },
        JWT_SECRET, 
        { expiresIn: '1h' } 
    );
};

module.exports = generateToken;