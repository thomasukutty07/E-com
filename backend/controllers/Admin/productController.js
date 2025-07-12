import { imageUploadUtil, deleteImageFromCloudinary, extractPublicIdFromUrl } from "../../helpers/cloudinary.js";
import productSchema from "../../models/productModel.js";

const testCloudinaryUrlParsing = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide an imageUrl" 
      });
    }
    
    const publicId = extractPublicIdFromUrl(imageUrl);
    
    res.status(200).json({
      success: true,
      originalUrl: imageUrl,
      extractedPublicId: publicId,
      message: "URL parsing test completed"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Plase upload an image" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    res
      .status(200)
      .json({ success: true, message: "Image uploaded successfully", result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      category,
      title,
      description,
      price,
      salePrice,
      brand,
      totalStock,
    } = req.body;
    const newlyCreatedProducts = new productSchema({
      image,
      category,
      title,
      description,
      price,
      salePrice,
      brand,
      totalStock,
    });
    await newlyCreatedProducts.save();
    res.status(200).json({
      success: true,
      data: newlyCreatedProducts,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch All Product
const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await productSchema.find({});
    res.status(200).json({ success: true, data: listOfProducts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//Edit Product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      category,
      title,
      description,
      price,
      salePrice,
      brand,
      totalStock,
    } = req.body;

    const findProduct = await productSchema.findById(id);
    if (!findProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.brand = brand || findProduct.brand;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.category = category || findProduct.category;
    findProduct.image = image || findProduct.image;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First find the product to get the image URL
    const findProduct = await productSchema.findById(id);
    
    if (!findProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    // Delete image from Cloudinary if it exists
    if (findProduct.image) {
      try {
        const cloudinaryResult = await deleteImageFromCloudinary(findProduct.image);
      } catch (cloudinaryError) {
        // Continue with product deletion even if image deletion fails
        // This ensures the product is still deleted from the database
      }
    } else {
      // No image URL found for product, skipping Cloudinary deletion
    }

    // Delete the product from database
    await productSchema.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export {
  handleImageUpload,
  fetchAllProduct,
  addProduct,
  editProduct,
  deleteProduct,
  testCloudinaryUrlParsing,
};
