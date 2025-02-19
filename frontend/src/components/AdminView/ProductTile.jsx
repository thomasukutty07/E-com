import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductTile = ({
  product,
  setCurrentEditedProduct,
  setOpenCreateProductDialog,
  setFormData,
  handleDeleteProduct,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            className="w-full h-[300px] object-cover rounded-t-lg"
            alt={product.title}
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold my-2">
            {product.title.charAt(0).toUpperCase() + product.title.slice(1)}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } font-semibold text-lg text-primary`}
            >
              ${product?.price}{" "}
            </span>
            {product.salePrice > 0 && (
              <span className="text-lg font-bold"> ${product?.salePrice} </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductDialog(true);
              setCurrentEditedProduct(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDeleteProduct(product._id)}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
