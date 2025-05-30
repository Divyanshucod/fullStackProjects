const express = require('express')
const { userSchemaSignIn,userSchemaSignUp } = require('../zodSchemas');
const { User } = require('../UserModel');
const jwt  = require('jsonwebtoken')
const {JWT_SECRET} = require('../config');
const { authMiddleWare } = require('../middleware');
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
    // hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        email,
        password:hashedPassword,
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
        return res.status(411).json({
            message:"User hasn't registered yet!"
        })
    }
    //password matching check
    const matched = await bcrypt.compare(password, userExist.password);
    if(!matched){
        return res.status(411).json({
            message:"user email/password incorrect!"
        })
    }
    // creating a jsonwebtoken 
    const token = jwt.sign({ id:userExist._id }, JWT_SECRET);
    res.status(200).json({
        userId : `Bearer ${token}`
    })
})

UserRouter.post('/updateInfo',authMiddleWare,async (req,res)=>{
    const body = req.body;
    const userId = req.userId;
    try {
        const updatedUserInfo = await User.findByIdAndUpdate(userId, body, {new:true});
        return res.status(200).status({
            message:'Information Updated Successfully!'
        })
    } catch (error) {
        res.status(500).json({
            message:"Something happened in while doing DB query!"
        })
    }
    
})

module.export = UserRouter