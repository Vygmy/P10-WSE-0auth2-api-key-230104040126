// middleware/validateToken.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
    let token;

    // Periksa header Authorization: Bearer <token>
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Ekstrak token
            token = req.headers.authorization.split(' ')[1];

            // Verifikasi token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Sematkan data pengguna (payload: id dan role) ke req.user
            req.user = { 
                id: decoded.id, 
                role: decoded.role 
            };

            next();
        } catch (error) {
            // Token tidak valid (expired, signature tidak cocok)
            console.error('Verifikasi Token Gagal:', error.message);
            return res.status(403).json({ 
                message: 'Akses Ditolak. Token tidak valid atau kedaluwarsa.' 
            });
        }
    }

    // Jika token tidak ada di header
    if (!token) {
        return res.status(403).json({ 
            message: 'Akses Ditolak. Tidak ada Bearer Token yang disediakan.' 
        });
    }
};

module.exports = validateToken;