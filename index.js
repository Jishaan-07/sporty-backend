require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router =require('./Routes/router')
require('./config/connection')


const sbServer = express()


sbServer.use(cors());
sbServer.use(express.json());
sbServer.use('/uploads',express.static('./uploads'))
sbServer.use(router)



const PORT = 3000 || process.env.PORT

sbServer.listen(PORT,()=>{
    console.log(`Sporty Blog Server started at port : ${PORT} and waiting for client request`);
    
})

// http://localhost:3000/
sbServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red"> Sporty Blog Server started   and waiting for client request!!!</h1>`)
})