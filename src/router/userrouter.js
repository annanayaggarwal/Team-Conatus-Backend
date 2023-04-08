const express=require('express')
const nodemailer=require('nodemailer')
require('dotenv').config()
const userRouter=express.Router();
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  var otp=getRandomInt(10000);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.AUTH_EMAIL, 
      pass: process.env.AUTH_PASS, 
    },
  });

const sendOtp=async(req,res)=>{
    try{
      const useremail=req.body.email;
    const data={
        from: '"Sneha Jaiswal" <sneha2112046@akgec.ac.in>',  
        to:useremail,
        subject: "User verification", 
        text: "Hello!", 
        html: `<b>Your OTP is:${otp}</b>`,          
    }
       transporter.sendMail(data,async(error,info)=>{
        if(error){
            throw new error;
        }
            console.log("email sent",info.messageId);
            res.json({
                message:"mail sent"
            })
       });
    }
    catch(err){
      console.log(err)
      res.json({
        message:err.message
      })
    }
}

const resendOtp=(req,res)=>{
      const otp2=getRandomInt(10000);
      otp=otp2;
      const useremail=req.body.email;
      const data={
            from: '"Sneha Jaiswal" <sneha2112046@akgec.ac.in>',  
            to: useremail,
            subject: "Resend OTP", 
            text: "Hello", 
            html: `<b>Your OTP is:${otp2}</b>`,          
      }
       transporter.sendMail(data,(error,info)=>{
        if(error){
            throw error;
        }
            console.log("email sent",info.messageId);
            res.status(201).send();
       });
}

const verifyOtp=async(req,res)=>{
  try{
    if(req.body.otp==otp){
      console.log("user verified")
      res.status(201).json({
        message:"user verified"
      })
    }
    else{
       console.log("otp doesn't match")
       res.status(500).json({
          message:"otp doesn't match"
       })
    }
  }
  catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}


userRouter
.route('/userverification')
.post(sendOtp)

userRouter
.route('/resendotp')
.post(resendOtp)

userRouter
.route('/verifyotp')
.post(verifyOtp)

module.exports=userRouter;
