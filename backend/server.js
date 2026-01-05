import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/connect.js';
import listRoutes from './src/routes/list.route.js';
import cors from 'cors'
import errorHandler from './src/middleware/error.middleware.js';
import reviewRouter from './src/routes/review.route.js';
import session from 'express-session'
import passport from "passport"
import './src/config/passport.js'
import authRoutes from './src/routes/user.route.js'

dotenv.config();

connectDB();


const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(
    session({
        secret: "mynameisprathum",
        resave:false,
        saveUninitialized: false,
        cookie:{
            httpOnly: true,
            secure: false,

            sameSite:"lax"
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/api/lists', listRoutes);
app.use('/api/lists',reviewRouter);
app.use("/api/auth", authRoutes);

app.use(errorHandler)
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})