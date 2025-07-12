import Address from "@/components/ShoppingView/Address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/ShoppingView/CartItemsContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.cart);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, curr) => {
          return (
            sum +
            (curr.salePrice > 0 ? curr.salePrice : curr.price) * curr.quantity
          );
        }, 0)
      : 0;

  function handleInitiatePaypalPayment() {
    // Navigate to payment not integrated page instead of initiating PayPal payment
    navigate("/shop/payment-not-integrated");
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} alt="" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-3 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((cartItem) => (
                <UserCartItemsContent
                  key={cartItem.title}
                  cartItem={cartItem}
                />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
            <div className="w-full mt-4">
              <Button onClick={handleInitiatePaypalPayment} className="w-full">
                Checkout with Paypal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
