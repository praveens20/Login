const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const otpGenerator = require('otp-generator');
const User = require("../models/user");

const router = express.Router();

//creating a new user
router.post('/user',(req,res,next) => {
    const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),   //hashing password
        fullName: req.body.fullName,
        location: req.body.location
    });
    User.find({email: req.body.email})  //check if user already exist
        .then(users => 
            {
                if(users.length==0) //if user does not exist
                {
                    newUser.save()
                        .then(user => res.json({"msg":"User "+user.email+ " Created successfully! Please Sign in to continue"}))   
                        .catch(err => res.json(err))
                }
                else
                    res.json({"msg":"Email already exist"});    //if user already exists
            })
        .catch(err => res.json(err))
})


//checking for the password to be correct
router.post('/authenticate',(req,res,next) => {
    User.findOne({ email:req.body.email})
        .then(user => 
            {
                if(!user)  //if user doesn't exist
                {
                    res.json({"msg":"User doesn't exist"});
                }
                else    //if user exists
                {
                    if(bcrypt.compareSync(req.body.password, user.password))    //if password matches
                    {
                        let token = jwt.sign({email: user.email, fullName: user.fullName, location: user.location}, 'secret', { expiresIn:'1h' });
                        res.json({"msg":"Password matched", token});
                    }
                    else    //if password doesn't match
                    {
                        res.json({"msg":"Password is incorrect"});  
                    }
                }
            })
        .catch(err => res.json(err))
})


router.get('/profile', (req,res,next) => {
    jwt.verify(req.query.token, 'secret', (err,data) => {
        if(err)
        {
            return res.json(err);
        }
        else if(data)
        {
            return res.json({"email":data.email, "fullName":data.fullName, "location":data.location});
        }
    })
})



router.post('/otp',(req,res,next) => {
    //setting up the nodemailer
    const transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
        user: 'praveens.mvm@gmail.com',
        pass: 'praveens20@'
        }
    }))

    //generating random otp
    let otp = otpGenerator.generate(5, { digits: true, alphabets: false, upperCase: false, specialChars:false });
    var mailOptions = {
        from: 'praveens.mvm@gmail.com',
        to: req.body.email,
        subject: 'OTP Verification',
        html: '<h1>Welcome</h1><p>Your OTP is </p>'+otp
      }
      
      //sending the otp through email
      transport.sendMail(mailOptions, (err, info) =>{
        if (err) 
        {
            res.json(err);
        } 
        else 
        {
            let sentotp = jwt.sign({otp: otp}, 'secret', { expiresIn:'1h' });
            res.json({"msg":"Email sent", sentotp});
        }
      })
})


router.get('/otp',(req,res,next) => {
    jwt.verify(req.query.otp, 'secret', (err,data) => {
        if(err)
        {
            return res.json(err);
        }
        else if(data)
        {
            return res.json({"otp":data.otp});
        }
    })
})


module.exports = router;