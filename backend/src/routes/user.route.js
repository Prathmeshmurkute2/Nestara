import express from 'express'
import passport from 'passport'
import { signUp } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/isAuth.middleware.js';

const router = express.Router();

router.post("/login", (req,res, next) =>{
    passport.authenticate("local", (err, user) =>{
        if(err) return next(err);

        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.logIn(user, (err)=>{
            if(err) return next(err);

            return res.status(200).json({
                message:"Login successful",
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        })
    })(req,res, next);
})
    
router.get("/home" , isAuthenticated, (req, res)=>{
    res.json({
        message: 'Welcome',
        user: req.user
    })
})

router.post("/signup", signUp);

export default router;