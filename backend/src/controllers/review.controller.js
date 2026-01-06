import Listing from "../models/listing.model.js";
import Review from "../models/reviews.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  const newReview = await Review.create({
    rating,
    comment,
    listing: listing._id,
    author: req.user._id
  });

  listing.reviews.push(newReview._id);
  await listing.save();

  await newReview.populate("author", "name");

  res.status(201).json({
    message: "Review added successfully",
    review: newReview
  });
});


export { addReview };

export const getReviewsByListing = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ listing: req.params.id })
    .populate("author", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({ reviews });
});



export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId, id } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({ message: "You are not allowed" });
  }

  await Review.findByIdAndDelete(reviewId);

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId }
  });

  const reviews = await Review.find({ listing: id })
    .populate("author", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "Review deleted successfully",
    reviews
  });
});
