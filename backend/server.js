import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/connect.js';
import Listing from './src/models/listing.model.js';
import listRoutes from './src/routes/list.route.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/api/lists', listRoutes);

// app.get('/testlisting',async(req,res) =>{
//     let sampleListing =new  Listing({
//         title: "my new villa",
//         description:"by the beach",
//         price:1200,
//         location:"goa",
//         country:"india"
//     });

//     await sampleListing.save();
//     console.log('sample saved');
//     res.send('sample listing created');
// })



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})