import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import ListingMap from '../components/ListingMap.jsx'

const ListingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setlisting] = useState(null);
    const [loading, setloading] = useState(true);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [reviews, setReviews] = useState([]);

    
    useEffect(()=>{
        const fetchListing = async () =>{
            const res = await fetch(
                `http://localhost:3000/api/lists/listings/${id}`,{
                    credentials:"include"
                }
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
                    `http://localhost:3000/api/lists/${id}/reviews`,{
                        credentials:"include"
                    }
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
                method: "DELETE",
                credentials:"include"
            }
        );

        navigate("/listings");
    }

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleReviewSubmit = async (e)=>{
        e.preventDefault();
        setSubmitting(true);

        if(rating===0){
            alert("Please select a rating");
            return;
        }

        try{
            const res = await fetch(
                `http://localhost:3000/api/lists/${id}/reviews`,
                {
                    method:"POST",
                    credentials: "include",
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
            
            setReviews((prev) =>[...prev, data.review]);
            setRating(0);
            setComment("");
        }
        catch(error){
            alert(error.message);
        }finally{
            setSubmitting(false);
        }
    }

    const handleDeleteReview = async (reviewId) =>{
        const confirm = window.confirm("Delete this review?");
        if(!confirm) return;

        try{
            const res = await fetch(
                `http://localhost:3000/api/lists/${id}/reviews/${reviewId}`,
                { method: "DELETE",
                    credentials:"include"
                 },
                
            );

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || "Failed to delete review");
            }
            setReviews((prev)=> prev.filter((r)=> r._id !== reviewId));
        }
        catch(error){
            alert(error.message)
        }
    }

    if(loading) return <p >Loading...</p>;
    if(!listing) return <p>Listing not found</p>;

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const ownerId =
        typeof listing?.owner === "string"
            ? listing.owner
            : listing?.owner?._id;

        const currentUserId = currentUser?._id || currentUser?.id;

        const isOwner = ownerId === currentUserId;


  return (
    <div className="p-6 max-w-3xl mx-auto">
        <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-80 object-cover rounded"
        />

        <p className="owner-name">
            Owner: <strong>{listing.owner?.name}</strong>
        </p>

        <h1 className="text-2xl font-bold mt-4">{listing.title}</h1>
        <p className="mt-2">{listing.description}</p>

        <p className="text-xl font-bold mt-2">{listing.price}</p>
        <p className="text-gray-600">{listing.location}, {listing.country}</p>

    {isOwner && (
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
    )}
        <hr/>
        {currentUser && (
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Leave a Review
                </h2>

                {/* Stars */}
                <Rating
                    onClick={handleRating}
                    initialValue={rating}
                    size={25}
                    transition
                    allowFraction={false}
                    SVGstyle={{ display: "inline-block" }}
                    fillColor="#facc15"
                    emptyColor="#e5e7eb"
                    className='flex gap-1'
                />

                {/* Comment */}
                <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your experience..."
                    className="w-full border rounded-lg p-3"
                    required
                />

                <button
                    disabled={submitting}
                    className="w-full bg-black text-white py-2 rounded-lg"
                >
                    Submit Review
                </button>
                </form>
            </div>
            )}

            <hr/>
            {reviews.map((review) => (
                <div
                    key={review._id}
                    className="border rounded-lg p-4 mb-4 shadow-sm"
                >
                    {/* Author */}
                    <p className="font-semibold">
                    {review.author?.name || "Anonymous"}
                    </p>

                    {/* Stars */}
                    <Rating
                    readonly
                    initialValue={review.rating}
                    size={18}
                    allowFraction={false}
                    SVGstyle={{ display: "inline-block" }}
                    fillColor="#facc15"
                    emptyColor='#e5e7eb'
                    className='flex gap-1'
                    />

                    <p className="text-gray-700 mt-1">{review.comment}</p>

                    <small className="text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                    </small>

                    {/* Delete only if author */}
                    {currentUserId === review.author?._id && (
                    <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-400 border rounded-lg p-2 ms-2 hover:text-red-600 transition"
                    >
                        Delete
                    </button>
                    )}
                </div>
                ))}
                <ListingMap
                    coordinates={[73.8567, 18.5204]}
                    title={listing.title}
                    location={listing.location}
                    />



        </div>
  )
}

export default ListingDetails;