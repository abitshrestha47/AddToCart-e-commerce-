import { User } from "../models/User.js";
import { hashPassword,comparePassword } from "../utils/passwordUtils.js";
import { jwtSign } from "../utils/jwtUtils.js";

export const createUser=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const EmailTaken=await User.findOne({email});
    if(EmailTaken){
         return res.status(409).json({message:'Email already taken'});
    }
    try{ 
       const hashedPassword=await hashPassword(password);
       const user=new User({username,email,password:hashedPassword});
       await user.save();
       res.status(201).json({message:'User saved successfully'});
    }catch(err){
       console.log(err.message);
       return res.status(500).json({message:'Server error'});
    }
 }

 export const authenticateUser=async(req,res,next)=>{
    const {email,password}=req.body;
    const emailExists=await User.findOne({email});
    if(!emailExists){
       return res.status(404).json({message:'Email doesnot exists'});
    }
    try{
       const checkPassword=await comparePassword(password,emailExists);
       if(!checkPassword){
          return res.status(401).json({message:'Incorrect password!'});
       }
       const token=jwtSign(res,emailExists,1);
       res.status(200).json({message:'successful login!'});
    }catch(err){
       console.log(err.message);
       return res.status(500).json({message:'Server error'});
    }
 }