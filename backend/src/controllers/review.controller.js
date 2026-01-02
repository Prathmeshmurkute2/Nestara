import Listing from "../models/listing.model.js";
import Review from "../models/reviews.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const addReview = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  if (!req.body.review) {
    return res.status(400).json({ message: "Review data is required" });
  }

  const newReview = new Review(req.body.review);

  await newReview.save();

  listing.reviews.push(newReview._id);
  await listing.save();

  res.status(201).json({
    message: "Review added successfully",
    review: newReview,
  });
});

export { addReview };
