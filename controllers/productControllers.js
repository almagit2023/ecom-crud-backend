const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    console.log("Request body:", req.body);
    console.log("req.file:", req.file);

    if (!req.file) {
      console.log("Image file missing in request");
      return res.status(400).json({ message: "Image file is required" });
    }

    console.log("req.user:", req.user);
    if (!req.user || !req.user._id) {
      console.log("User not authenticated or user ID missing");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const newProduct = new Product({
      name,
      category,
      price,
      image: req.file.path,
      image_public_id: req.file.filename,
      userId: req.user._id,
    });

    console.log("New product data:", newProduct);
    await newProduct.save();
    console.log("Product saved successfully");

    res.status(201).json({
      message: "Product Created Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("Error creating product:", error.message);
    console.log("Error stack:", error.stack);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If image is provided, delete old and replace
    if (req.file) {
      if (existingProduct.image_public_id) {
        await cloudinary.uploader.destroy(existingProduct.image_public_id);
      }
      existingProduct.image = req.file.path;
      existingProduct.image_public_id = req.file.filename;
    }

    // Update other fields
    existingProduct.name = name;
    existingProduct.category = category;
    existingProduct.price = price;
    existingProduct.userId = req.user._id; // Ensure userId is set

    await existingProduct.save();

    res.status(200).json({
      message: "Product Updated Successfully",
      updatedProduct: existingProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from Cloudinary
    if (product.image && product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    // Delete product from MongoDB
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

// FETCH (unchanged)
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  deleteProduct,
  updateProduct,
};