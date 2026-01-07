import React ,{ useState, useEffect } from "react";
import { Link,NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";


const Navbar = () => {
  const navigate= useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/search?q=${query}`,{
            credentials: "include"
          }
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error", err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

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
  <div className="w-full h-14 bg-white shadow-sm flex items-center px-4">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-6">
      <Link to="/listings" className="text-red-600 text-xl">
        <FontAwesomeIcon icon={faCompass} />
      </Link>

      <NavLink
        to="/listings"
        className={({ isActive }) =>
          `no-underline ${
            isActive ? "text-red-600" : "text-black hover:text-red-600"
          }`
        }
      >
        Explore
      </NavLink>
    </div>

    {/* CENTER SEARCH (KEY FIX) */}
    <div className="relative flex-1 flex justify-center">
      <div className="flex items-center bg-white shadow-md rounded-xl w-full max-w-[420px]">
        <input
          type="text"
          placeholder="Type text here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 outline-none rounded-l-xl"
        />
        <button className="bg-black text-white px-4 py-2 rounded-r-xl">
          🔍
        </button>
      </div>

      {/* SEARCH RESULTS */}
      {results.length > 0 && (
        <div className="absolute top-12 w-full max-w-[420px] bg-white shadow-lg rounded-xl max-h-72 overflow-y-auto z-50">
          {results.map((item) => (
            <div
              key={item._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/listings/${item._id}`)}
            >
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* RIGHT SECTION */}
    <div className="flex gap-6 text-base font-normal shrink-0">
      <NavLink
        to="/create"
        className={({ isActive }) =>
          `no-underline ${
            isActive ? "text-red-600" : "text-black hover:text-red-600"
          }`
        }
      >
        List your place
      </NavLink>

      {!isLoggedIn && (
        <>
          <Link to="/signup" className="text-black font-bold">
            Sign up
          </Link>
          <Link to="/login" className="text-black font-bold">
            Login
          </Link>
        </>
      )}

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="text-black hover:text-red-600 font-bold"
        >
          Log out
        </button>
      )}
    </div>

  </div>
);

};

export default Navbar;
