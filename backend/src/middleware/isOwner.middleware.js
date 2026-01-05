import Listing from '../models/listing.model.js'

const isOwner = async (req, res, next)=>{
    const { id } = req.params;

    const listing = await Listing.findByid(id);

    if(!listing){
        return res.status(404).json({ message: "Listing not found" });
    }

    if(!listing.owner.equals(req.user._id)){
        return res.status(403).json({
            message:"You are not allowed to modify this listing"
        });
    }

    next();
}

export default isOwner;