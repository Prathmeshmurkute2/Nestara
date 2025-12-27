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
    <div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>

        <input 
        type="text" 
        name="title"
        placeholder="List Title" 
        className="border p-2 m-2"
        onChange={handleChange}
        />


        <textarea 
        name="description"
        placeholder="List Description" 
        className="border p-2 m-2"
        onChange={handleChange}
        />


        <input
        type="file"
        accept='image/*'
        name="image"
        className="border p-2 m-2"
        onChange={handleImageChange}
        />

        <input 
        type="number" 
        name="price"
        placeholder='price' 
        className="border p-2 m-2"
        onChange={handleChange}
        />


        <input 
        type="text" 
        name="location"
        placeholder='location' 
        className="border p-2 m-2"
        onChange={handleChange}
        />


        <input 
        type="text" 
        name="country"
        placeholder='country' 
        className="border p-2 m-2"
        onChange={handleChange}
        />

        <button className="bg-blue-500 text-white p-2 m-2">
            Create List
            </button>
      </form>
    </div>
  )
}

export default CreateList
