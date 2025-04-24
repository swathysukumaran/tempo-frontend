import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { API_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { Globe, Compass, Menu } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      return response.ok;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center relative">
      <img
        src={logo}
        alt="logo"
        onClick={() => navigate("/create-trip-new")}
        className="w-auto h-12 sm:h-16 md:h-20 cursor-pointer"
      />
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </Button>
        </div>
        <div
          className={`absolute md:relative top-full right-0 w-full bg-white  p-4 ${
            isMenuOpen
              ? "flex flex-col w-max items-end gap-4"
              : "hidden md:flex md:flex-row gap-4 md:items-center"
          }`}
        >
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => {
              navigate("/create-trip-new");
              setIsMenuOpen(false);
            }}
          >
            <Compass size={20} />
            Create Trip
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => {
              navigate("/saved-trips");
              setIsMenuOpen(false);
            }}
          >
            <Globe size={20} />
            My Trips
          </Button>
          <Button
            variant="ghost"
            className="bg-primary text-white"
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
