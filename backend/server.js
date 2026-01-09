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
import searchRoutes from "./src/routes/search.route.js";
import MongoStore from "connect-mongo";

dotenv.config();

connectDB();


const app = express();
app.set("trust proxy", 1);


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(
    session({
        name:"connect.sid",
        secret: process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
            ttl: 24 * 60* 60
        }),

        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 // 1 day
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
app.use("/api/search", searchRoutes);

app.use(errorHandler)
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})