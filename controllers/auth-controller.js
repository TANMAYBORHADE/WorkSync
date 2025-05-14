//register controller

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async(req,res)=>{
    try{
        const {username, email, password, role} = req.body;
        const checkExistingUser = await User.findOne({$or:[{username},{email}]})
        if(!checkExistingUser){
            // console.log(checkExistingUser)
            return res.status(400).json({
                success:false,
                message:'User exists either with same username or email'
            })
        }

        // hash user-password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        // create a new user and save in your database
        const newlyCreatedUser = new User({
            username,email,password:hashedPassword,role:role||'user'
        })

        await newlyCreatedUser.save();
        if(newlyCreatedUser){
            res.status(200).json({
                success:true,
                message:'User registered successfully'
            })
        }else{
            res.status(400).json({
                success:false,
                message:'Unable to register user, please try again'
            })
        }

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:'Some error occurred'
        })
    }
}

//login controller
const loginUser = async(req,res)=>{
    try{
        const {username,password} = req.body;

        const user = await User.findOne({username:username});
        // console.log(user)
        // res.status(200)
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User doesnt exist'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:'Invalid credentials!'
            })
        }

        // create user token
        const accessToken = jwt.sign({
            userId: user._id,
            username:user.username,
            role:user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'15m'
        })

        res.status(200).json({
            success:true,
            message:'Logged in successfully.',
            accessToken
        })
    
    }catch(e){

        console.log(e)
        res.status(500).json({
            success:false,
            message:'Some error occurred'
        })
    }

}

module.exports = {registerUser,loginUser}