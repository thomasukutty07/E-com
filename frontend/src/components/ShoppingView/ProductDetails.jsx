import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setProductDeatils } from "@/store/Shop/shopSlice";

const ProductDetailsDialog = ({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDeatils());
  }
  function handleAddToCartWithAuth() {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    handleAddToCart(productDetails._id);
  }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 sm:p-12 max-w-[98vw] sm:max-w-[90vw] lg:max-w-[70vw]">
        <DialogTitle className="sr-only">
          <span>Title</span>
        </DialogTitle>
        <div className="relative rounded-lg overflow-hidden w-full max-w-full flex justify-center items-center">
          <img
            width={600}
            height={600}
            className="aspect-square w-full max-w-xs sm:max-w-full object-cover mx-auto"
            src={productDetails?.image}
            alt={productDetails?.title}
          />
        </div>

        <div className="w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground mb-5 text-lg sm:text-2xl mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p
              className={`text-2xl sm:text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice && productDetails.salePrice > 0 ? (
              <p className="text-2xl sm:text-3xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-0.5 mt-3">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <span className="ml-1 text-lg">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              className="w-full"
              onClick={handleAddToCartWithAuth}
            >
              Add to cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[250px] overflow-auto mt-4">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Code Hub</h3>
                  </div>

                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Code Hub</h3>
                  </div>

                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Code Hub</h3>
                  </div>

                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-1 mt-5">
            <Input type="text" placeholder="Write a review" />
            <Button>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
