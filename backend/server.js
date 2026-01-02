import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/connect.js';
import listRoutes from './src/routes/list.route.js';
import cors from 'cors'
import errorHandler from './src/middleware/error.middleware.js';
import reviewRouter from './src/routes/review.route.js';

dotenv.config();

connectDB();


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended:true }))


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/api/lists', listRoutes);
app.use('/api/lists',reviewRouter);

app.use(errorHandler)
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})