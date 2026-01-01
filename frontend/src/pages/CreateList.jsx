import React, { useState } from "react";

const CreateList = () => {
  // 🔹 Validation state (replaces EJS JS)
  const [validated, setValidated] = useState(false);

  // 🔹 Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
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

    // 🔴 Bootstrap validation logic
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

      // image is optional
      if (image) {
        data.append("image", image);
      }

      const response = await fetch(
        "http://localhost:3000/api/lists/listings",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.text();
      console.log(result);
      alert("Listing created successfully");
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
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">Country is required</div>

          <button className="btn btn-primary w-full">
            Create List
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateList;
