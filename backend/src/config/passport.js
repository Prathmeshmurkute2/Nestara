import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.js';

passport.use(
    new LocalStrategy(
        { 
            usernameField: "email"
        },
        asyncHandler(async (email ,password, done)=>{
            const user = await User.findOne({ email });

            if(!user){
                return done(null, false, { message:"User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return done(null, false, { message: "Incorrect password" })
            }

            return done(null, user);
        })

    )
)

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const user = await User.findById(id);
    done(null, user);
})
