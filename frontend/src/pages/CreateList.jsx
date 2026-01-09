import React, { useState } from "react";

const CreateList = () => {
  // 🔹 Validation state (replaces EJS JS)
  const [validated, setValidated] = useState(false);

  const CATEGORIES = [
  "trending",
  "rooms",
  "iconic",
  "mountains",
  "castles",
  "pools",
  "camping",
  "farms",
  "arctic",
];


  // 🔹 Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    category:"",
  });

  // 🔹 Optional image
  const [image, setImage] = useState(null);

  // 🔹 Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle image (optional)
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 🔹 Submit (Bootstrap validation + API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("country", formData.country);
      data.append("category", formData.category);


      
      if (image) {
        data.append("image", image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lists/listings`,
        {
          method: "POST",
          credentials:"include",
          body: data,
          
        }
      );

      if (!response.ok) {
          const errorText = await response.text();
          console.error("Backend error:", errorText);
          alert("Failed to create listing");
          return;
        }

      const result = await response.json();
      console.log(result);
      alert("Listing created successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",
        category:"",
      });

      setImage(null);
      setValidated(false);

    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center py-4">
          Create a New Listing
        </h1>

        {/* 🔹 Bootstrap Validation Form */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`needs-validation space-y-3 ${
            validated ? "was-validated" : ""
          }`}
        >
          {/* Title */}
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="List Title"
            className="form-control"
            value={formData.title}
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">Title is required</div>

          {/* Description */}
          <label>Description</label>
          <textarea
            name="description"
            placeholder="List Description"
            className="form-control"
            value={formData.description}
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">Description is required</div>

          {/* Image (Optional) */}
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />

          {/* Price */}
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-control"
            value={formData.price}
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">Price is required</div>

          {/* Location */}
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="form-control"
            value={formData.location}
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">Location is required</div>

          {/* Country */}
          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="form-control"
            value={formData.country}
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">Country is required</div>

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control m-2"
            required
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat)=>(
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            Category is required
          </div>

          <button className="btn btn-primary w-full">
            Create List
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateList;
