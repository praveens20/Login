//importing the required modules or libraries
const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const cors = require("cors");
const path = require("path");

const server = express();

const port = process.env.port || 3000;  

const url = "mongodb://localhost:27017/vayuz";   //basic url for mongodb with database name

const userRouter = require("./routes/userRouter");

//setting up the node server
server.listen(port, (err) => {
    if(err)
    {
        throw err;
    }
    console.log("server is started at localhost:" +port);
})

//setting up the connection between node and mongodb
mongoose.connect(url,{ useNewUrlParser: true })
    .then(console.log("mongodb is connected successfully"))
    .catch(err => console.log(err))

server.use(express.json());
server.use(express.urlencoded({ extended:false }));
server.use(cors()); 
server.use(express.static(path.join(__dirname, 'public'))); 
  

server.use('/',userRouter);

exports.module = server;