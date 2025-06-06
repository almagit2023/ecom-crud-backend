const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name ..."],
    },
    category: {
      type: String,
      required: [true, "Please Enter Product Category..."],
      default: "DEFAULT",
    },
    price: {
      type: String,
      required: [true, "Please Enter Product Price..."],
    },
    image: {
      type: String,
      required: [true, "Please Upload Product Image..."],
    },
    image_public_id: {
      type: String,
      required: [true, "Image public ID is required for deletion/updating..."],
    },
    userId : {
       type: mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
