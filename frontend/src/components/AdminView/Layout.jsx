import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./SideBar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin SideBar */}
      <AdminSideBar isOpen={isOpen} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader setOpen={setOpen} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
