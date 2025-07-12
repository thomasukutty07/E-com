import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/Config";
import { useNavigate } from "react-router-dom";

const ShoppingProductTile = ({
  product,
  handleAddToCart,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => navigate(`/shop/product/${product._id}`)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full object-cover h-[300px] rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold my-2">
            {product.title.charAt(0).toUpperCase() + product.title.slice(1)}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={` ${
                product?.salePrice ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={() => handleAddToCart(product._id)} className="w-full">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
