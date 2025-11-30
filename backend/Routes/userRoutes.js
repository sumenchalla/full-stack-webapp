const express = require("express");
const User = require("../models/user");
const {protect}= require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @route POST  /api/users/register
// @desc Register a new user 
// @access Public

router.post("/register", async(req,res)=>{
    const {name,email,password} = req.body;
    // res.send({name,email,password});
    try{
        // Registration Logic
        let user = await User.findOne({email});

        if (user) return res.status(400).json({message: "User with this email address already exsists"});

        user = new User({name,email,password});
        await user.save();
        // res.status(201).json({   Instead of sending like this lets create a payload
        //     user: {
        //         _id : user._id,
        //         name:user.name,
        //         email:user.email,
        //         role : user.role
        //     }
        // })

        //  Create a JWT payload
        const payload = {user:{_id:user._id,role:user.role}};

        // Sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
            if (err) throw err;

            // Send the user and token in response

            res.status(201).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            })
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error")
    }

});

// @route POST  /api/users/login
// @desc Authenticate a existing user
// @access Public

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    try{
        //Find the user by email
        let user = await User.findOne({email});

        if(!user) return res.status(400).json({message:"User with this email does not exists"});

        const isMatch = await user.matchPassword(password); // this method is available in userSchmea 

        if(!isMatch) return res.status(400).json({message :"Incorrect password"});

        //  Create a JWT payload
        const payload = {user:{_id:user._id,role:user.role}};

        // Sign and return the token(this will encode the user._id and user.role) along with user data 
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
            if (err) throw err;

            // Send the user and token in response
            res.json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            })
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error")
    }
})

// @route GET  /api/users/profile
// @desc get the logged-in user profile 
// @access Private

router.get("/profile",protect,async (req,res)=>{
    res.json(req.user); // user details are being dedcoded using the token in protect middleware
})

module.exports = router;