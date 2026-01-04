import bcrypt from 'bcrypt';
import User from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.js';

export const signUp = asyncHandler( async(req,res)=>{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ message: "All field required" })
    }

    const user = await User.findOne({ email });

    if(user){
        return res.status(409).json({ message:"User already exist" })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password:hashPassword
    })

    res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    }
})
})

