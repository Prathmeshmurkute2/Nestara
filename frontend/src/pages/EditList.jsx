import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: ""
  });

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(
        `http://localhost:3000/api/lists/listings/${id}`
      );
      const data = await res.json();
      setFormData(data.listing);
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `http://localhost:3000/api/lists/listings/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        })
      }
    );

    navigate("/listings");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input name="title" value={formData.title} onChange={handleChange} className="border p-2 m-2" />
      <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 m-2" />
      <input name="price" type="number" value={formData.price} onChange={handleChange} className="border p-2 m-2" />
      <input name="location" value={formData.location} onChange={handleChange} className="border p-2 m-2" />
      <input name="country" value={formData.country} onChange={handleChange} className="border p-2 m-2" />
      <button className="bg-green-500 text-white p-2 m-2">Update</button>
    </form>
  );
};

export default EditList;
