import ShoppingHeader from "@/components/ShoppingView/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
