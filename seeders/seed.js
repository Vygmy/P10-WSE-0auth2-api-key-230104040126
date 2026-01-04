// seeders/seed.js
require('dotenv').config(); 
const mongoose = require('mongoose');
const User = require('../models/User'); 
const ApiKey = require('../models/ApiKey');
const Product = require("../models/Product");

const MONGODB_URI = process.env.MONGODB_URI; 
// ... (Data products, users, apiKeys di sini, pastikan users tetap 'admin'/'password123')

const products = [
    { name: 'Laptop Gaming Pro', price: 15000000, stock: 10, description: 'Laptop performa tinggi.' },
    { name: 'Monitor 4K Ultra', price: 5000000, stock: 25, description: 'Monitor dengan resolusi terbaik.' },
    { name: 'Keyboard Mekanik', price: 1500000, stock: 50, description: 'Keyboard dengan switch tactile.' },
    { name: 'Mouse Wireless Ergonomis', price: 500000, stock: 30, description: 'Mouse nyaman untuk pemakaian lama.' }
];

const users = [
    { username: 'admin', password: 'password123', role: 'admin' },
    { username: 'userbiasa', password: 'userpass', role: 'user' },
];

const apiKeys = [
    { key: 'PRACTICUM_API_KEY_A_1234567890', owner: 'Public App Client A', status: 'active' },
    { key: 'PUBLIC_VIEW_ONLY_KEY_B_ABCDEFG', owner: 'Public App Client B', status: 'active' },
];

// Fungsi Seeder utama
const seedDB = async () => {
    if (!MONGODB_URI) {
        console.error('❌ Error: MONGODB_URI tidak ditemukan di .env.');
        process.exit(1);
    }
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Koneksi MongoDB Berhasil');

        await Product.deleteMany();
        await User.deleteMany(); // Hapus data user lama
        await ApiKey.deleteMany();
        console.log('🗑️ Data Lama Berhasil Dihapus'); 

        await Product.insertMany(products);
        console.log(`[+] Produk (${products.length} item) berhasil dimasukkan.`); 

        await User.insertMany(users); // Masukkan data user baru (akan di-hash di model)
        console.log(`[+] User (${users.length} item) berhasil dimasukkan (Password di-hash).`);

        await ApiKey.insertMany(apiKeys);
        console.log(`[+] API Key (${apiKeys.length} item) berhasil dimasukkan.`);

        console.log('\n🌟 Proses Seeding Selesai! 🌟');
        process.exit();
    } catch (error) {
        console.error('❌ GAGAL saat Seeding Data:', error.message);
        // Error koneksi MongoDB Atlas (AggregateError) seringkali terjadi di sini
        process.exit(1);
    }
};

seedDB();