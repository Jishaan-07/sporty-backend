
const users=require('../Model/userModel')

const jwt = require('jsonwebtoken')

// register
exports.registerController=async(req,res)=>{
    console.log("Inside registerController");
    const {username,email,password}=req.body
    console.log(username,email,password);
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Exists...Please Login.")

        }else{
            const newUser = new users({
                username,email,password,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)

        }
    } catch (err) {
        res.status(401).json(err)
 
    }
}

// login
exports.loginController=async(req,res)=>{
    console.log("Inside loginController");
    const { email,password}=req.body
    console.log( email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // token making
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
 
        }else{
            res.status(404).json("Invalid Email/Password")

 
        }
    } catch (err) {
        res.status(401).json(err)
 
    }
}

// profile updation
 exports.editUserController = async(req,res)=>{
    console.log("Inside editUserController ");
    // getting user from jwtmiddleware
    const  userId = req.userId
    const {username,email,password,profilePic}=req.body
    const uploadProfileImgFile = req.file?req.file.filename:profilePic
    try {
        const updatedUser = await users.findByIdAndUpdate({_id:userId}, {username,email,password,profilePic:uploadProfileImgFile},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(401).json(err)
    }
 }