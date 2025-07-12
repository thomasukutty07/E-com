import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CreditCard, ShoppingCart } from "lucide-react";

const PaymentNotIntegrated = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Not Available
          </CardTitle>
          <CardDescription className="text-gray-600">
            Payment functionality is currently not integrated in this demo version.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <CreditCard className="h-4 w-4" />
              <span>PayPal integration is not configured</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <ShoppingCart className="h-4 w-4" />
              <span>This is a demonstration application</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">What you can do:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Browse products and add them to cart</li>
              <li>• View your shopping cart</li>
              <li>• Manage your account settings</li>
              <li>• Explore the admin dashboard</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => navigate("/shop/home")}
              className="w-full"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/shop/account")}
              className="w-full"
            >
              View Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentNotIntegrated; 