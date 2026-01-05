import Listing from "../models/listing.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createList  =asyncHandler( async (req,res) =>{
    
        console.log("REQ BODY:", req.body);
        console.log("FILE:", req.file);


        const { title, description, price, location, country } = req.body;
         if (!title || !description || !price || !location || !country) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const numericPrice = Number(price);
        if(isNaN(numericPrice) || numericPrice <= 0){
          return res.status(400).json({ message: "Price must be a positive number" });
        }
        const SecListing = {
            title,
            description,
            price: numericPrice,
            location,
            country,
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
        const listing = await Listing.findById(id).populate("owner","name _id");
        if(!listing){
            return res.status(404).json({message:"Listing not found"});

        }
        res.status(200).json({listing});
  
});

export const updateListById = asyncHandler(async (req,res)=>{
      
    const { id } = req.params;

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      country: req.body.country,
    };

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