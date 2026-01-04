// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

// Mongoose Pre-save Hook: Hashing Password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { 
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
});

// Method Instance: Membandingkan Password Saat Login (KRITIS)
userSchema.methods.matchPassword = async function(enteredPassword) {
    // 🚨 KUNCI: Membandingkan plain text dengan hash menggunakan await
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;