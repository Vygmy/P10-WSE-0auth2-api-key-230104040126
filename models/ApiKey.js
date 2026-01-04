// models/ApiKey.js
const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        minlength: 20
    },
    owner: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'revoked'],
        default: 'active',
    },
    rateLimit: {
        type: Number,
        default: 1000,
    },
}, { timestamps: true });

const ApiKey = mongoose.model('ApiKey', ApiKeySchema);
module.exports = ApiKey;