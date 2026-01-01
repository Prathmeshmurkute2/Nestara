import Listing from "../models/listing.model.js";

export const createList  = async (req,res) =>{
    try{
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
        const Listing = {
            title,
            description,
            price: numericPrice,
            location,
            country,
        };

        if(req.file){
          Listing.image = req.file.path;
        }

        const newListing = new Listing(Listing);
        await newListing.save();
        res.status(201).json({message:"Listing created successfully", Listing: newListing});

    }catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
}

export const getAllLists= async (req,res) =>{
    try{
        const Listings = await Listing.find();
        res.status(200).json({Listings} );
    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
}

export const getListById = async (req,res) =>{
    try{
        const { id } =  req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            return res.status(404).json({message:"Listing not found"});

        }
        res.status(200).json({listing});
    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message})
    }
}

export const updateListById = async (req,res)=>{
      try {
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
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

export const deleteListById = async (req,res)=>{
    try{
        const { id } = req.params;
        const deleteListing = await Listing.findByIdAndDelete(id);
        if(!deleteListing){
            return res.status(404).json({message:"Listing not found"});
        }
        res.status(200).json({message:"Listing deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
}