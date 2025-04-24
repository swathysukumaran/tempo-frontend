import React from "react";
import { Outlet } from "react-router-dom";
import registerImage from "../../assets/register.jpeg";
import logo from "../../assets/logo.png";
function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block lg:w-1/2 ">
        <img
          src={registerImage}
          alt="A man relaxing on a beach"
          className="object-cover w-full h-full opacity-90" // opacity helps blend with bg
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 ">
        <div className="text-center justify-center items-center mb-8">
          {/* Simple musical wave logo */}
          <img
            src={logo}
            alt="logo"
            className="w-auto h-12 mx-auto sm:h-16 md:h-20"
          />
          <h1 className="text-h2 font-bold text-gray-700 mb-2">Tempo</h1>
          <p className="text-body ">Travel at your rhythm</p>
          <p className="text-small text-gray-500">
            Discover personalized itineraries powered by AI, designed to match
            your interests, and style.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
