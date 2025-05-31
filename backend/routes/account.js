const express = require('express')
const mongoose = require('mongoose')
const {authMiddleWare} = require('../middleware');
const { Account } = require('../AccountModel');
const AccountRouter = express.Router();

AccountRouter.get('/balance',authMiddleWare,async (req,res)=>{
     const userId = req.userId;
     const user = await Account.findOne({userId});

     res.status(200).json({
        balance: user.balance
     })
})
AccountRouter.post('/transfer',authMiddleWare,async (req,res)=>{
    // good solution for transaction
    try {
        const session = await mongoose.startSession();
    session.startTransaction();
    let {to,amount} = req.body;
    amount = parseInt(amount)
    const SenderAccount = await Account.findOne({userId:req.userId}).session(session);
   
    
    if(!SenderAccount || SenderAccount.balance < amount ){
        await session.abortTransaction();
          
        return res.status(400).json({
           
            message: 'Insufficient Balance!'
        })
    }
   
    const receiverAccount = await Account.findOne({userId:to}).session(session);
    if(!receiverAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: 'Invalid Account!'
        })
    }

    //performing the transfer
    await Account.findOneAndUpdate({userId:req.userId},{$inc:{balance: -amount}}).session(session)
    await Account.findOneAndUpdate({userId:to},{$inc:{balance: amount}}).session(session)

    // commit the transaction
    await session.commitTransaction();

    res.status(200).json({
        message:'Transfer Successfull!'
    })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:"Transaction Failed!"
        })
    }

})
module.exports = {
    AccountRouter
}