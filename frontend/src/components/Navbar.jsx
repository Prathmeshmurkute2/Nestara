import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  return (
    <div className="w-full h-12 bg-white shadow-sm flex items-center px-4">
      
      {/* Logo */}
      <div className="text-red-600 text-xl mr-6">
        <FontAwesomeIcon icon={faCompass} />
      </div>

      {/* Navigation */}
      <nav className="flex gap-6 text-base font-medium">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `no-underline
             ${isActive 
               ? "text-red-600" 
               : "text-black hover:text-red-600 transition"}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/listings"
          className={({ isActive }) =>
            `no-underline
             ${isActive 
               ? "text-red-600" 
               : "text-black hover:text-red-600 transition"}`
          }
        >
          All Listings
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `no-underline
             ${isActive 
               ? "text-red-600" 
               : "text-black hover:text-red-600 transition"}`
          }
        >
          Add New Listing
        </NavLink>

      </nav>
    </div>
  );
};

export default Navbar;
