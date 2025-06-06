const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');

const MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL;

const connectMongo = require('./db/db');
connectMongo(MONGO_URL_LOCAL);

// We need to mount this two middlewares for seameless integration
app.use(cors());
app.use(express.json());

app.get('/test',(req, res)=>{
    res.send("Testing Server 1 2 3 .... ");
    res.end();
});

// Product Router
const productRouter = require('./routes/productRoutes');
app.use('/products', productRouter);


// Auth Router
const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);

app.listen(PORT, (error)=>{
    if(error){
        console.log("Error connecting to Server...", error);
    }
    else{
        console.log(`Server Running successfully on ${PORT}`);
    }
})