const express = require('express')
const { userSchemaSignIn,userSchemaSignUp } = require('../zodSchemas');
const { User } = require('../UserModel');
const {jwt}  = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const UserRouter = express.Router()


UserRouter.post('/signup',async (req,res)=>{
    const {email,firstname,lastname,password} = req.body;
    const validateUser = userSchemaSignUp.safeParse({email:email,password:password,firstname:firstname,lastname:lastname});
    if(!validateUser.success){
        return res.status(411).json({
            message:'Please Enter a Validate details!'
        })
    }
    // database check for user existence.
    const userExist = await User.findOne({email:email});
    if(userExist){
        return res.status(403).json({
            message:'user already exist!'
        })
    }
    await User.create({
        email,
        password,
        lastname,
        firstname
    })

    res.status(200).json({
        message:'user created successfully!'
    })
    
})

UserRouter.post('/signin', async (req,res)=>{
    const {email,password} = req.body;
    const validateUser = userSchemaSignIn.safeParse({email:email,password:password});
    if(!validateUser.success){
        return res.status(411).json({
            message:'Please Enter a Validate details!'
        })
    }
    // database check for user existence.
    const userExist = await User.findOne({email:email});
    if(!userExist){
        return res.status(403).json({
            message:"User hasn't registered yet!"
        })
    }
    // creating a jsonwebtoken 
    const token = jwt.sign({ id:userExist._id }, JWT_SECRET);
    res.status(200).json({
        userId : token
    })
})

UserRouter.post('/updateInfo',(req,res)=>{
    
})

module.export = UserRouter