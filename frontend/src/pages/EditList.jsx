import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image:""
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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
      data.append("price", Number(formData.price));
      data.append("location", formData.location);
      data.append("country", formData.country);

      if (image) {
        data.append("image", image);
      }

      await fetch(
        `http://localhost:3000/api/lists/listings/${id}`,
        {
          method: "PUT",
          body: data,
          credentials:"include"
        }
      );

      navigate(`/listings/${id}`);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={`needs-validation p-4 ${
        validated ? "was-validated" : ""
      }`}
    >
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-control m-2"
        required
      />
      <div className="invalid-feedback">Title is required</div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-control m-2"
        required
      />
      <div className="invalid-feedback">Description is required</div>

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="form-control m-2"
        required
      />
      <div className="invalid-feedback">Price is required</div>

      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="form-control m-2"
        required
      />
      <div className="invalid-feedback">Location is required</div>

      <input
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="form-control m-2"
        required
      />
      <div className="invalid-feedback">Country is required</div>

      {/* Optional image */}
      {formData.image && (
        <div className="m-2">
          <p>Current Image:</p>
          <img
            src={formData.image}
            alt="Current"
            style={{ width: "200px", borderRadius:"8px"}}
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="form-control m-2"
        onChange={handleImageChange}
      />

      <button className="btn btn-success m-2">
        Update
      </button>
    </form>
  );
};

export default EditList;
