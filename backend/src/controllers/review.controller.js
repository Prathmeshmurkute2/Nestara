import Listing from "../models/listing.model.js";
import Review from "../models/reviews.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const addReview = asyncHandler(async (req, res) => {
  const rating = req.body?.rating;
  const comment = req.body?.comment;

  

  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  if (!rating || !comment) {
    return res.status(400).json({ message: "Review data is required" });
  }

  const newReview = new Review({
    rating,
    comment,
    listing: listing._id,
  });

  await newReview.save();

  listing.reviews.push(newReview._id);
  await listing.save();

  const reviews = await Review.find({
    listing: listing._id
  }).sort({ createdAt: -1 });

  res.status(201).json({
    message: "Review added successfully",
    reviews,
  });
});

export { addReview };

export const getReviewsByListing= asyncHandler(async (req,res)=>{
  const reviews = await Review.find({ listing: req.params.id })
  .sort({
    createdAt: -1
  });

  res.status(200).json({
    reviews: reviews || []
  });
});


export const deleteReview = asyncHandler( async (req,res)=>{
  const { reviewId, id } = req.params; // id=listingId

  const review = await Review.findById(reviewId);
  if(!review){
    return res.status(404).json({ message:"Review not found"});
  }

  await Review.findByIdAndDelete(reviewId);

  await Listing.findByIdAndUpdate(id,{
    $pull: { reviews: reviewId }
  });

  const reviews = await Review.find({ listing: id })
  .sort({ createdAt: -1 });

  res.status(200).json({
    message:"Review deleted successfully",
    reviews
  })
})