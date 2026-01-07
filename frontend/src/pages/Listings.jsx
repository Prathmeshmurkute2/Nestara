import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/FormatPrice.js";
import CategoryBar from "../components/CategoryBar.jsx";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState("");

  const fetchListings = async (selectedCategory = "") => {
    try {
      setLoading(true);

      const query = selectedCategory
        ? `?category=${selectedCategory}`
        : "";

      const res = await fetch(
        `http://localhost:3000/api/lists/listings${query}`
      );

      if (!res.ok) throw new Error("Failed to fetch listings");

      const data = await res.json();
      setListings(Array.isArray(data.Listings) ? data.Listings : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Fetch listings whenever category changes
  useEffect(() => {
    fetchListings(category);
  }, [category]);

  if (loading)
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );

  if (error)
    return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      
      {/* CATEGORY BAR */}
      <CategoryBar
        activeCategory={category}
        onSelect={setCategory}
      />

      {/* LISTINGS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {listings.map((listing) => (
          <Link
            key={listing._id}
            to={`/listings/${listing._id}`}
            className="group block rounded-xl overflow-hidden bg-white shadow-md 
                       hover:shadow-xl transition-all duration-300 no-underline text-inherit"
          >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={listing.image || "https://via.placeholder.com/400"}
                alt={listing.title}
                className="w-full h-full object-cover 
                           group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 bg-black/70 text-white 
                               text-sm px-3 py-1 rounded-full">
                {formatPrice(listing.price)}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-1">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {listing.title}
              </h2>

              <p className="text-sm text-gray-500 truncate">
                {listing.location}, {listing.country}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2">
                {listing.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listings;
