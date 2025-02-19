import { BaggageClaim, Columns2, LayoutDashboard } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription, // Add this
} from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Columns2 />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BaggageClaim />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2 cursor-pointer">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center cursor-pointer gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

const AdminSideBar = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64" aria-describedby={undefined}>
          <div className="flex flex-col h-full cursor-pointer">
            <SheetHeader
              onClick={() => {
                setOpen(false);
                navigate("/admin/dashboard");
              }}
            >
              <LayoutDashboard />
              <SheetTitle>Admin Panel</SheetTitle>
              <SheetDescription className="sr-only">Dashboard</SheetDescription>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 lg:flex flex-col border-r bg-background p-6">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <LayoutDashboard className="w-10 h-10" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
