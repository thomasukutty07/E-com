import { House, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingHeaderMenuItems } from "@/Config";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/Auth/authSlice";

function MenuItems() {
  return (
    <nav className="flex flex-col lg:flex-row mb-3 lg:mb-0 lg:items-center gap-6">
      {shoppingHeaderMenuItems.map((menu) => (
        <Link
          className="text-sm font-medium gap-2"
          key={menu.id}
          to={menu.path}
        >
          {menu.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleUserLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="flex justify-between items-center flex-row my-3 gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer ">
            <AvatarFallback className="!bg-black !text-white font-extrabold uppercase">
              {user?.userName[0].toUpperCase() + user?.userName.slice(1, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-48 mt-3">
          <DropdownMenuLabel>{`Hi, ${user?.userName}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User className="w-10" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUserLogout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
      </Button>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" to="/shop/home">
          <House className="h-6 w-6" />
          <span className="font-bold">E-Commerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <DialogTitle className="sr-only">Menu</DialogTitle>
            <DialogDescription className="sr-only">
              Navigation menu with account and shopping options.
            </DialogDescription>
            <HeaderRightContent />
            <MenuItems />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
