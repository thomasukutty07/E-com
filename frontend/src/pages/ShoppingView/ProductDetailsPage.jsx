import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "@/store/Shop/shopSlice";
import ProductDetails from "../../components/ShoppingView/ProductDetails";
import { Skeleton } from "../../components/ui/skeleton";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, isLoading } = useSelector((state) => state.shop);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  if (isLoading || !productDetails) {
    return <Skeleton className="w-full h-[600px]" />;
  }

  return (
    <ProductDetails productDetails={productDetails} handleAddToCart={() => {}} />
  );
};

export default ProductDetailsPage; 