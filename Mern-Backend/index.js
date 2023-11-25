import express from 'express';
import connectionToMongoDB from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
connectionToMongoDB();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json()); // middleware to use the json



app.use('/api',router);
app.use("/uploads",express.static('./uploads'));


app.listen(port,()=>{
    console.log(`Serve Successfully Running on http://localhost:${port}`);
});


