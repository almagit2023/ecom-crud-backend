const express = require('express');
const productRouter = express.Router();
const ensureAuthenticated = require('../middlewares/Auth'); // Import the middleware

const {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  deleteProduct,
  updateProduct
} = require('../controllers/productControllers');

const productValidation = require('../middlewares/productValidation');
const upload = require('../middlewares/multerUploads');

// Routes with middleware
productRouter.post('/', ensureAuthenticated, upload.single('image'), productValidation, createProduct);
productRouter.get('/', ensureAuthenticated, fetchAllProducts);
productRouter.get('/:id', ensureAuthenticated, fetchSingleProduct);
productRouter.delete('/:id', ensureAuthenticated, deleteProduct);
productRouter.put('/:id', ensureAuthenticated, upload.single('image'), productValidation, updateProduct);

module.exports = productRouter;
