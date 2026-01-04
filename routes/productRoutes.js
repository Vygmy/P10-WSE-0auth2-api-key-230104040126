// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateApiKey = require('../middleware/validateApiKey');
const validateToken = require('../middleware/validateToken');

// Route Publik: GET /api/v1/products/public (API Key)
router.get('/public', validateApiKey, productController.getPublicProducts);

// Route Privat: CRUD /api/v1/products/private (JWT + Admin Role)
router.post('/private', 
    validateToken, 
    productController.checkAdminRole,
    productController.createProduct
);

router.put('/private/:id', 
    validateToken, 
    productController.checkAdminRole,
    productController.updateProduct
);

router.delete('/private/:id', 
    validateToken, 
    productController.checkAdminRole,
    productController.deleteProduct
);

module.exports = router;