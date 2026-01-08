import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  // 🔹 Search API
  useEffect(() => {
    if (!query.trim()) return setResults([]);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/search?q=${query}`,
          { credentials: "include" }
        );
        setResults(await res.json());
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  //  Auth check
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/home", {
      credentials: "include",
    })
      .then((res) => setIsLoggedIn(res.ok))
      .catch(() => setIsLoggedIn(false));
  }, [location.pathname]);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    navigate("/");
  };

  const navItem = "no-underline text-black hover:text-red-600 transition-colors duration-200";

  const navLinkClass= ({ isActive }) =>`
  no-underline transition-colors duration-200 ${
    isActive ? "text-red-600" : "text-black hover:text-red-600"
  }`
  return (
    <nav className="w-full bg-white shadow-sm px-4 py-3">
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Link to="/listings" className="text-red-600 text-xl">
            <FontAwesomeIcon icon={faCompass} />
          </Link>

          <NavLink
            to="/listings"
            className={({ isActive }) =>
              `hidden md:block no-underline transition-colors duration-200 ${
                  isActive ? "text-red-600" : "text-black hover:text-red-600"
    }`
  }
          >
            Explore
          </NavLink>
        </div>

        {/* CENTER SEARCH */}
        <div className="col-span-2 md:col-span-1 order-last md:order-none relative">
          <div className="flex bg-white shadow-md rounded-xl">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 outline-none rounded-l-xl"
            />
            <button className="bg-black text-white px-4 rounded-r-xl">
              🔍
            </button>
          </div>

          {results.length > 0 && (
            <div className="absolute w-full bg-white shadow-lg rounded-xl mt-2 max-h-60 overflow-y-auto z-50">
              {results.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/listings/${item._id}`)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT (Desktop) */}
        <div className="hidden md:flex justify-end gap-6">
          <NavLink to="/create" className={navLinkClass}>List your place</NavLink>

          {!isLoggedIn ? (
            <>
              <Link to="/signup" className={navItem}>Sign up</Link>
              <Link to="/login" className={navItem}>Login</Link>
            </>
          ) : (
            <button onClick={handleLogout} className={navItem}>Logout</button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex justify-end">
          <button onClick={() => setOpenMenu(!openMenu)}>
            <FontAwesomeIcon icon={openMenu ? faXmark : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {openMenu && (
        <div className="md:hidden mt-4 flex flex-col gap-3 border-t pt-4 ">
          <NavLink to="/listings" className={navLinkClass} onClick={() => setOpenMenu(false)}>Explore</NavLink>
          <NavLink to="/create" className={navLinkClass}>List your place</NavLink>

          {!isLoggedIn ? (
            <>
              <Link to="/signup" className={navItem}>Sign up</Link>
              <Link to="/login" className={navItem}>Login</Link>
            </>
          ) : (
            <button onClick={handleLogout} className={navItem}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
