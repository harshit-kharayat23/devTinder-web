import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { User, LogOut, Crown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";

const Navbar = () => {
  const user = useSelector((store) => store.user.loggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await fetch(import.meta.env.VITE_BASE_URL + "/logout", {
        method: "POST",
        credentials: "include",
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md border-b py-3 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Branding */}
        <h1 className="text-2xl md:text-3xl font-bold cursor-pointer select-none">
          dev<span className="text-rose-600">Tinder</span>
        </h1>

        {/* Right section */}
        {user ? (
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-6">
            {/* Navigation Links */}
            <Button variant="link" asChild>
              <Link to="/feed" className="font-bold text-base sm:text-lg">
                Feed
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/connections" className="font-bold text-base sm:text-lg text-blue-600">
                Connections
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/requests" className="font-bold text-base sm:text-lg text-blue-600">
                Requests
              </Link>
            </Button>

            {/* Welcome Text */}
            <p className="font-semibold hidden md:block whitespace-nowrap text-sm sm:text-base">
              Welcome, {user?.firstName}
            </p>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.photoUrl}
                    alt="User"
                  />
                  <AvatarFallback>{user?.firstName?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/premium" className="flex items-center gap-2 text-yellow-600">
                    <Crown className="w-4 h-4" />
                    Premium
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login">
              <Button variant="outline" className="text-sm sm:text-base">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-rose-500 text-white hover:bg-rose-700 text-sm sm:text-base">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
