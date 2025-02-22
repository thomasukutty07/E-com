import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./CartItemsContent";

const UserCartWrapper = ({ cartItems }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
        return  sum +
            (currentItem?.salePrice
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity;
        }, 0)
      : 0;
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button className="w-full mt-3">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
