import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 👈 used for Edit navigation

const Listings = () => {
  // ---------------- STATE ----------------
  const [listings, setListings] = useState([]);   // store all listings
  const [loading, setLoading] = useState(true);   // loading state
  const [error, setError] = useState(null);       // error state

  // ---------------- FETCH ALL LISTINGS ----------------
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/lists/listings");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("LISTINGS API DATA 👉", data);

        // safely set listings (prevents crash if data is wrong)
        setListings(Array.isArray(data.Listings) ? data.Listings : []);
      } catch (err) {
        console.error("FETCH ERROR 👉", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // ---------------- DELETE LISTING ----------------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/lists/listings/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete listing");
      }

      // remove deleted item from UI without reloading page
      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ---------------- UI STATES ----------------
  if (loading) return <p className="p-4">Loading listings...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (listings.length === 0) return <p className="p-4">No listings found.</p>;

  // ---------------- MAIN UI ----------------
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <div key={listing._id} className="border rounded p-4 shadow">
          
          {/* Listing image */}
          <img
            src={listing.image || "https://via.placeholder.com/400"}
            alt={listing.title}
            className="w-full h-40 object-cover mb-2"
          />

          {/* Listing details */}
          <h2 className="font-semibold">{listing.title}</h2>
          <p className="text-sm">{listing.description}</p>
          <p className="font-bold">₹{listing.price}</p>
          <p className="text-sm text-gray-600">
            {listing.location}, {listing.country}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 mt-3">
            
            {/* EDIT BUTTON → navigates to edit page */}
            <Link
              to={`/edit/${listing._id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </Link>

            {/* DELETE BUTTON → deletes listing */}
            <button
              onClick={() => handleDelete(listing._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Listings;
