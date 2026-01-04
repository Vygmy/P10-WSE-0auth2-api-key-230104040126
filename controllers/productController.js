// controllers/productController.js
const Product = require('../models/Product');

// Middleware Otorisasi
const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({ message: 'Akses Ditolak. Operasi ini memerlukan peran (role) Admin.' });
    }
};
exports.checkAdminRole = checkAdminRole; 

// Handler untuk Akses Publik (Read-Only)
exports.getPublicProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select('-__v'); 
        console.log(`[LOG] Akses publik oleh: ${req.apiKeyOwner}`); 
        res.status(200).json({
            count: products.length,
            data: products,
            message: 'Akses Publik: Data produk berhasil diambil.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data produk.' });
    }
};

// Handler CRUD Private (Hanya Admin)
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.status(201).json({ message: 'Produk berhasil dibuat.', data: product });
    } catch (error) {
        res.status(400).json({ message: 'Gagal membuat produk.', errors: error.message });
    }
};
// ... (Tambahkan updateProduct dan deleteProduct sesuai kode sebelumnya)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        res.status(200).json({ message: 'Produk berhasil diperbarui.', data: product });
    } catch (error) {
        res.status(400).json({ message: 'Gagal memperbarui produk.', errors: error.message });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        res.status(200).json({ message: 'Produk berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus produk.' });
    }
};