import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/layout";
import LoginUser from "./pages/Auth/login";
import RegisterUser from "./pages/Auth/register";
import AdminLayout from "./components/AdminView/Layout";
import AdminProducts from "./pages/AdminView/Products";
import AdminOrders from "./pages/AdminView/Order";
import AdminFeatures from "./pages/AdminView/Features";
import AdminDashboard from "./pages/AdminView/Dashboard";
import ShoppingLayout from "./components/ShoppingView/Layout";
import NotFound from "./pages/NotFound";
import ShoppingHome from "./pages/ShoppingView/Home";
import ShoppingList from "./pages/ShoppingView/Listing";
import ShoppingCheckout from "./pages/ShoppingView/Checkout";
import ShoppingAccount from "./pages/ShoppingView/Account";
import CheckAuth from "./components/Common/CheckAuth";
import UnAuthPage from "./pages/UnAuthPage/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/Auth/authSlice";
import { Skeleton } from "./components/ui/skeleton";
const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] h-[600px] " />;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
     
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<LoginUser />} />
          <Route path="register" element={<RegisterUser />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="list" element={<ShoppingList />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
