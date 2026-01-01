import mongoose from'mongoose'

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        trim:true,
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [50, "Title cannot exceed 50 characters"]
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        trim:true,
        minlength: [10, "Description must be at least 10 characters"],
    },
    image:{
        type:String,
        default:'https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=clouds-cloudy-countryside-236047.jpg&fm=jpg',
    },
    price:{
        type:Number,
        required:[true, 'Price is required'],
        min:[1,'Price must be greater than zero'],
    },
    location:{
        type:String,
        required:[true,'Location is required'],
        trim:true,
    },
    country:{
        type:String,
        required:[true,'Country is required'],
        trim:true,
    }

},{timestamps:true})

const Listing = mongoose.model('Listing', listSchema);
export default Listing;