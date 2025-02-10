const mongoose = require('mongoose')


const connection_string = process.env.CONNECTIONSTRING

mongoose.connect(connection_string).then((res)=>{
    console.log("MONGODB Connection successfully with server");
    
}).catch(err=>{
    console.log("Mongodb Atlas Connection failed!!");
    console.log(err);
    
})