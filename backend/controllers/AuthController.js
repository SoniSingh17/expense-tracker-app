
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const signup = async (req , res)=>{
    try{
        const { name , email , password } = req.body;
        const ExistingUser = await userModel.findOne({ email : email});
        if(ExistingUser){
            return res.status(409).json({
                message : "User already Exist ! You can login " , success : false
            });
        }
        
        const bcryped_password = await bcrypt.hash(password , 10);
        const user = await userModel.create({ name , email , password : bcryped_password});
        
        res.status(201).json({
            message : "User sign-up Successful !",
            success : true
        })


    }
    catch(err){
        res.status(500).json({
            message : "Internal Server Error",
            Error : err,
            success : false
        })

    }

}

const login = async (req , res)=>{
    try{
        const { email , password } = req.body;
        const ExistingUser = await userModel.findOne({ email : email});
        const message = "email or password is wrong"
        if(!ExistingUser){
            return res.status(403).json({
                message :  message , success : false
            });
        }
        
        const isPassEqual = await bcrypt.compare(password , ExistingUser.password);
        if(!isPassEqual){
            return res.status(403).json({message : message , success : false});
        }
        // email and password is correct than we will make a jwt token
        const jwt_token = jwt.sign({email : ExistingUser.email , id : ExistingUser._id} , process.env.JWT_SECRET ,
            { expiresIn : "24h"}
        );
        
        res.status(200).json({
            message : "User login Successful !",
            success : true,
            jwt_token : jwt_token ,
            email : email,
            name : ExistingUser.name
            
        })

       


    }
    catch(err){
        res.status(500).json({
            message : "Internal Server Error",
            Error : err,
            success : false
        })

    }

}
module.exports = {
    signup ,
    login
}