import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../hooks/useUserStore";

const Header = () => {
  const { isAuthenticated, logout } = useUserStore();
  return (
    <header className="w-full border-b border-black">
      <div className="container mx-auto flex items-center justify-center py-2 px-4 gap-2">
        <h1 className="text-xl font-bold leading-snug text-red-500">
          Movie
          <span className="font font-semibold ml-2 text-cyan-700">Booking</span>
        </h1>

        <Link className="px-2 py-1 border rounded-md">Home</Link>
        {!isAuthenticated && (
          <Link to={"/signup"} className="px-2 py-1 rounded-md border">
            Sign Up
          </Link>
        )}
        {isAuthenticated && (
          <button className="px-2 py-1 rounded-md border" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
