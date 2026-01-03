import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
const ListingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setlisting] = useState(null);
    const [loading, setloading] = useState(true);

    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [reviews, setReviews] = useState([]);


    useEffect(()=>{
        const fetchListing = async () =>{
            const res = await fetch(
                `http://localhost:3000/api/lists/listings/${id}`
            );
            const data = await res.json();
            setlisting(data.listing);
            setloading(false);
        };

        fetchListing();
    },[id]);

    useEffect(()=>{
        const fetchReviews = async()=>{
            try{
                const res = await fetch(
                    `http://localhost:3000/api/lists/${id}/reviews`
                );
                const data = await res.json();
                setReviews(data.reviews || []);
            }
            catch(err){
                console.error("Failed to load reviews");
                setReviews([]);
            }
        };
        fetchReviews();
    },[id]);

    const handleDelete = async() =>{
        const confirm = window.confirm("Are you sure you want to delete this listing?");
        if(!confirm) return;
        
        await fetch(
            `http://localhost:3000/api/lists/listings/${id}`,
            {
                method: "DELETE"
            }
        );

        navigate("/listings");
    }

    const handleReviewSubmit = async (e)=>{
        e.preventDefault();
        setSubmitting(true);

        try{
            const res = await fetch(
                `http://localhost:3000/api/lists/${id}/reviews`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                    
                            rating,
                            comment
                    
                    })
                }
            );
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || "Failed to submit review");
            }

            alert("Review added successfully ✅");
            
            setReviews(data.reviews || []);
            setRating(3);
            setComment("");
        }
        catch(error){
            alert(error.message);
        }finally{
            setSubmitting(false);
        }
    }

    if(loading) return <p >Loading...</p>;
    if(!listing) return <p>Listing not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
        <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-80 object-cover rounded"
        />

        <h1 className="text-2xl font-bold mt-4">{listing.title}</h1>
        <p className="mt-2">{listing.description}</p>

        <p className="text-xl font-bold mt-2">{listing.price}</p>
        <p className="text-gray-600">{listing.location}, {listing.country}</p>

        <div className="flex gap-4 mt-6">
            <NavLink
                to={`/edit/${listing._id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 no-underline"
                >Edit</NavLink>

                <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >Delete</button>
        </div>
        <hr/>
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <form onSubmit={handleReviewSubmit} className="space-y-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                Leave a Review
                </h2>

                {/* Rating */}
                <div className="flex flex-col gap-2">
                <label
                    htmlFor="rating"
                    className="text-sm font-medium text-gray-700"
                >
                    Rating
                </label>

                <input
                    name="rate"
                    id="rating"
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={rating}
                    onChange={(e)=>setRating(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                />

                <p className="text-sm text-gray-600">Rating: {rating}</p>
                </div>

                {/* Comment */}
                <div className="flex flex-col gap-2">
                <label
                    htmlFor="comment"
                    className="text-sm font-medium text-gray-700"
                >
                    Comments
                </label>

                <textarea
                    name="comment"
                    id="comment"
                    rows="5"
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    placeholder="Write your experience here..."
                    className="border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                {/* Submit Button */}
                <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-2 rounded-lg 
                            hover:bg-gray-800 transition font-medium"
                >
                Submit Review
                </button>
            </form>
            </div>
            <hr/>
            <div className="max-w-2xl mx-auto mt-10">
                <h2 className='text-xl font-semibold mb-4'>All Reviews</h2>

                {Array.isArray(reviews) && reviews.length === 0 && (
                    <p className='text-gray-500'>No reviews yet</p>
                )}

                {Array.isArray(reviews) && reviews.map((review) =>(
                    <div
                        key={review._id}
                        className='border rounded-lg p-4 mb-4 shadow-sm'
                    >
                        <p className='font-medium'>⭐ {review.rating} / 5</p>
                        <p className='text-gray-700 mt-1'>{review.comment}</p>
                        <small className='text-gray-400'>
                            {new Date(review.createdAt).toLocaleDateString()}
                        </small>
                    </div>
                ))}
            </div>


        </div>
  )
}

export default ListingDetails
