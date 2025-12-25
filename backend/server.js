import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/connect.js';

dotenv.config();
connectDB();

const app = express();


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.get('/testlisting',async(req,res) =>{
    let sampleListing =new  Listing({
        title: "my new villa",
        description:"by the beach",
        price:1200,
        location:"goa",
        country:"india"
    });

    await sampleListing.save();
    console.log('sample saved');
    res.send('sample listing created');
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})