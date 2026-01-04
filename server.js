// server.js

// 1. Memuat Variabel Lingkungan (.env)
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware bawaan untuk parsing body JSON
app.use(express.json());

// 2. Fungsi Koneksi ke MongoDB Atlas
const connectDB = async () => {
    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI belum diatur di file .env!');
        process.exit(1);
    }
    try {
        // Mongoose 6+ tidak memerlukan opsi useNewUrlParser/UnifiedTopology
        await mongoose.connect(MONGODB_URI); 
        console.log('✅ Koneksi ke MongoDB Atlas Berhasil!');
    } catch (err) {
        console.error(`❌ GAGAL KONEKSI ke MongoDB Atlas, ${err.message}`);
        process.exit(1);
    }
};

// 3. Route Dasar (Pengujian Server)
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Server Berjalan!',
        praktikum: 'P10: Simulasi API Key & OAuth 2.0',
    });
});

// 4. Integrasi Routes API
app.use('/api/v1/products', productRoutes); 
app.use('/api/v1/auth', authRoutes); 

// 5. Memulai Server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
};

// Jalankan Koneksi Database, lalu Start Server
connectDB().then(startServer);