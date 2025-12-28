import { set } from 'mongoose';
import React,{ useState } from 'react'
import { use } from 'react'

const CreateList = () => {
    const [formData, setFormData] = useState({
        title:'',
        description:'',
        image:'',
        price:'',
        location:'',
        country:''
    })

    const [image, setImage] = useState(null);

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleImageChange = (e) =>{
        setImage(e.target.files[0]);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('image', image);
            data.append('price', formData.price);
            data.append('location', formData.location);
            data.append('country', formData.country);
            

            const response = await fetch('http://localhost:3000/api/lists/listings', {
                method: 'POST',
                 headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        ...formData,
                        price: Number(formData.price) // ✅ optional but professional
                })
            });

            const result = await response.json();
            console.log(result);
            alert('Listing created successfully');
        }
        catch(error){
            console.error('Error creating listing:', error);
            alert('Failed to create listing');
        }
    }
  return (
    
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center py-4">
        Create a New Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-3"
      >
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="List Title"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="List Description"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          className="border p-2 w-full"
          onChange={handleImageChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <label>Country</label>
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Create List
        </button>
      </form>
    </div>
  </div>


  )
}

export default CreateList
