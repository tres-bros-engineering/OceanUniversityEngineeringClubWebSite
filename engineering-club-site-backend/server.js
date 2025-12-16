const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

require('dotenv').config();

//middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const port = process.env.PORT;
const host = process.env.HOST;
const uri = process.env.URI;

const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('Database connected successfully');
    }
    catch(error){
        console.log('Database error: ',error)
    }
}

connect();

const server = app.listen(port,host,() => {
    console.log(`Node server is listening to ${server.address().port}`)
});

app.use('/api', router);