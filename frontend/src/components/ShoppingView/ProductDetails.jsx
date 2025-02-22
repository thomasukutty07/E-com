import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ProductDetailsDialog = ({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <DialogTitle className="sr-only">
          <span>Title</span>
        </DialogTitle>
        <div className="relative rounded-lg overflow-hidden">
          <img
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
            src={productDetails?.image}
            alt={productDetails?.title}
          />
        </div>

        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground mb-5 text-2xl mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className=" flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice && productDetails.salePrice > 0 ? (
              <p className="text-3xl font-bold text-muted-foreground">
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
              className=" w-full"
              onClick={() => handleAddToCart(productDetails._id)}
            >
              Add to cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[250px] overflow-auto mt-4">
            <h2 className="text-xl font-boldm mb-4 font-bold">Reviews</h2>
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
