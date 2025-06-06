const express = require('express');
const productRouter = express.Router();

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
productRouter.post('/', upload.single('image'), productValidation, createProduct);
productRouter.get('/', fetchAllProducts);
productRouter.get('/:id', fetchSingleProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', upload.single('image'), productValidation, updateProduct);

module.exports = productRouter;
