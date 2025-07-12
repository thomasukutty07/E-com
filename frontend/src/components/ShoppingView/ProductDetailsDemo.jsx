import React, { useState } from "react";
import ProductDetailsDialog from "./ProductDetails.jsx";

const sampleProduct = {
  _id: "1",
  title: "Sample Product",
  description: "This is a sample product description for testing the dialog responsiveness and layout.",
  price: 120,
  salePrice: 99,
  image: "https://via.placeholder.com/600x600.png?text=Product+Image",
};

const ProductDetailsDemo = () => {
  const [open, setOpen] = useState(false);

  const handleAddToCart = (id) => {
    alert(`Added product ${id} to cart!`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Show Product Details Dialog
      </button>
      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        productDetails={sampleProduct}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetailsDemo; 