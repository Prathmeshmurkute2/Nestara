import React ,{ useState, useEffect } from "react";
import { Link,NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";


const Navbar = () => {
  const navigate= useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    fetch("http://localhost:3000/api/auth/home",{
      credentials: "include"
    })
    .then((res)=> setIsLoggedIn(res.ok))
    .catch(()=> setIsLoggedIn(false))

  },[location.pathname]) 

  const handleLogout = async ()=>{
    await fetch("http://localhost:3000/api/auth/logout",{
      method:"POST",
      credentials: "include"
    })
    setIsLoggedIn(false);
    navigate("/")
  }

  return (
    <div className="w-full h-12 bg-white shadow-sm flex items-center px-4">
      
      <div className="text-red-600 text-xl mr-6">
        <FontAwesomeIcon icon={faCompass} />
      </div>

      <nav className="flex gap-6 text-base font-sans">
        
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
      <nav className="flex gap-6 text-base font-normal ms-auto">
        {!isLoggedIn && (
        <>
        <Link
          to="/signup"
          className="no-underline text-black"
        >
          Sign up
        </Link>

        <Link
          to="/login"
          className="no-underline text-black"
        >
          Login
        </Link>
        </>
        )}

        {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="text-black hover:text-red-600 transition"
        >
          Log out
        </button>
      )}
      </nav>
    </div>
  );
};

export default Navbar;
