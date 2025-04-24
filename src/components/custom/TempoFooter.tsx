import React from "react";
import { Link } from "react-router-dom"; // If using React Router

function TempoFooter() {
  return (
    <footer className="bg-primary py-6 border-t border-gray-200 text-center md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link
            to="/contact"
            className="text-sm text-white hover:text-secondary-dark"
          >
            Contact Us
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-white hover:text-secondary-dark"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-sm text-white hover:text-secondary-dark"
          >
            Terms of Service
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-white hover:text-secondary-dark">
          &copy; {new Date().getFullYear()} Tempo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default TempoFooter;
