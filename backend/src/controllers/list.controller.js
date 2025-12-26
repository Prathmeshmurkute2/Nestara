import Listing from "../models/listing.model.js";

export const createList  = async (req,res) =>{
    try{
        const { title, description, price, location, country } = req.body;
        const newListing = new Listing({
            title,
            description,
            price,
            location,
            country
        });
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
    try{
        const { id } = req.params;
        const updateListById = await Listing.findByIdAndUpdate(id);
        if(!updateListById){
            return res.status(404).json({message:"Listing not found"});
        }
        res.status(200).json({message:"Listing updated successfully", Listing: updateListById
            
        })
    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message});
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