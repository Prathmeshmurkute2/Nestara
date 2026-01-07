import Listing from "../models/listing.model.js"

export const searchListings = async (req, res) =>{
    const { q } = req.query;

    if(!q){
        return res.status(400).json({ message:"Search query is required" });
    }

    try{
        const results = await Listing.find({
            $or:[
                { title: { $regex: q, $options: "i"} },
                {location: { $regex: q, $options: "i"}},
                { category: { $regex: q, $options: "i"}}
            ]
        }).limit(20);

        res.status(200).json(results);

    }catch(error){
         res.status(500).json({ message: "Search failed" });
    }
}