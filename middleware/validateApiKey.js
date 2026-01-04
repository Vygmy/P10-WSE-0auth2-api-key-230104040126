// middleware/validateApiKey.js
const ApiKey = require('../models/ApiKey'); 

const validateApiKey = async (req, res, next) => {
    // Mencari API Key dari header x-api-key
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
        return res.status(401).json({ 
            message: 'Akses Ditolak. Header x-api-key diperlukan.' 
        });
    }

    try {
        const foundKey = await ApiKey.findOne({ 
            key: apiKey, 
            status: 'active' 
        });

        if (!foundKey) {
            return res.status(401).json({ 
                message: 'API Key tidak valid atau telah dicabut.' 
            });
        }

        // Lampirkan info owner untuk logging
        req.apiKeyOwner = foundKey.owner;

        next();
    } catch (error) {
        console.error('Error validasi API Key:', error);
        return res.status(500).json({ 
            message: 'Kesalahan Server Internal saat validasi kunci.' 
        });
    }
};

module.exports = validateApiKey;