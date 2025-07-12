import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "@/store/Shop/shopSlice";
import { addToCart, fetchCartItems } from "@/store/Shop/cartSlice";
import ProductDetails from "../../components/ShoppingView/ProductDetails";
import { Skeleton } from "../../components/ui/skeleton";
import { useToast } from "../../hooks/use-toast";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetails, isLoading } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = (productId) => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    dispatch(
      addToCart({ userId: user?.id, productId: productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to cart",
        });
      }
    });
  };

  if (isLoading || !productDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-0 sm:p-4">
        <div className="w-full bg-white rounded-2xl shadow-lg p-2 sm:p-8 flex flex-col md:flex-row gap-4 sm:gap-8">
          <div className="flex-1">
            <Skeleton className="w-full aspect-square rounded-xl mb-4" />
          </div>
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductDetails productDetails={productDetails} handleAddToCart={handleAddToCart} />
  );
};

export default ProductDetailsPage; 