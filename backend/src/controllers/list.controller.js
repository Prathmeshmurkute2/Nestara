import cloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { geocodeLocation } from "../utils/geocode.js";

export const createList  =asyncHandler( async (req,res) =>{
    
        const { title, description, price, location, country, category } = req.body;
         if (!title || !description || !price || !location || !country || !category) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const numericPrice = Number(price);
        if(isNaN(numericPrice) || numericPrice <= 0){
          return res.status(400).json({ message: "Price must be a positive number" });
        }

        const fullAddress = `${location}, ${country}`;
        const coordinates = await geocodeLocation(fullAddress);

        const SecListing = {
            title,
            description,
            price: numericPrice,
            location,
            country,
            category,
            geometry:{
              type:"Point",
              coordinates
            }
        };

        if(req.file){
          SecListing.image = req.file.path;
        }

        const newListing = new Listing({
          ...SecListing,
          owner: req.user._id
});
        await newListing.save();
        res.status(201).json({message:"Listing created successfully", Listing: newListing});

});

export const getAllLists= asyncHandler(async (req,res) =>{
    
        const Listings = await Listing.find();
        res.status(200).json({Listings} );
    
});

export const getListById = asyncHandler(async (req,res) =>{
    
        const { id } =  req.params;
        const listing = await Listing.findById(id)
        .populate("owner","name _id")
        .populate({
          path: "reviews",
          populate:{
            path: "author",
            select: "name _id"
          }
        })
        if(!listing){
            return res.status(404).json({message:"Listing not found"});

        }
        res.status(200).json({listing});
  
});

export const updateListById = asyncHandler(async (req,res)=>{
    if ("category" in req.body && !req.body.category) {
          return res.status(400).json({
            message: "Category is required"
          });
}
    const { id } = req.params;

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      country: req.body.country,
      category: req.body.category,
    };

    if (req.body.location || req.body.country) {
      const fullAddress = `${req.body.location}, ${req.body.country}`;
      const coordinates = await geocodeLocation(fullAddress);

      updatedData.geometry = {
        type: "Point",
        coordinates,
      };
  }
    // ✅ if new image uploaded, update it
    if (req.file) {
      updatedData.image = req.file.path; // Cloudinary URL
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({
      message: 'Listing updated successfully',
      listing: updatedListing,
    });
 
})

export const deleteListById = asyncHandler(async (req,res)=>{


        const { id } = req.params;
        const deleteListing = await Listing.findByIdAndDelete(id);
        if(!deleteListing){
            return res.status(404).json({message:"Listing not found"});
        }
        res.status(200).json({message:"Listing deleted successfully"});
   
})