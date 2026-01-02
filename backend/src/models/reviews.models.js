import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"]
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
            return v.length >= 5;
            },
            message: "Comment must contain meaningful text"
        },
    }


    
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
