import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/connect.js';
import listRoutes from './src/routes/list.route.js';
import cors from 'cors'


dotenv.config();
console.log("ENV CHECK:", {
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
});

connectDB();


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended:true }))


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/api/lists', listRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})