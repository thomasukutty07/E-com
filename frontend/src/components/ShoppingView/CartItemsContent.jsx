import { MinusIcon, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartQuantity } from "@/store/Shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Removed from cart",
        });
      }
    });
  }
  function updateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart updated",
        });
      }
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            disabled={cartItem?.quantity === 1}
            onClick={() => updateQuantity(cartItem, "minus")}
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
          >
            <MinusIcon className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span>{cartItem?.quantity}</span>
          <Button
            onClick={() => updateQuantity(cartItem, "plus")}
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(cartItem?.salePrice ? cartItem.salePrice : cartItem.price) *
            cartItem.quantity}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
