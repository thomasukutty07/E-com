import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Only protect /admin and /shop/checkout
  const isProtectedRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/shop/checkout";

  if (
    !isAuthenticated &&
    isProtectedRoute &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  if (
    isAuthenticated &&
    user.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to={"/unauth-page"} />;
  }

  if (
    isAuthenticated &&
    user.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
};

export default CheckAuth;