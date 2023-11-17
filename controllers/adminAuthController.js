// import { User } from "../models/User";
import {Admin} from '../models/Admin.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { jwtSign } from '../utils/jwtUtils.js';
export const createAdmin=async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        const ExistingEmail=await Admin.findOne({email});
        if(ExistingEmail){
            return res.status(409).json({message:'Email already taken!'});
        }
        const hashedPassword=await hashPassword(password);
        const admin=new Admin({username,email,password:hashedPassword});
        await admin.save();
        res.status(200).json({message:'Signup complete!'});
    }catch(err){
        console.log(err.message); 
        return res.status(500).json({message:'Internal Server Error!'});      
    }
}

export const authenticateAdmin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const EmailFound=await Admin.findOne({email});
        if(!EmailFound){
            return res.status(404).json({message:'Email not found!'});
        }
        const passwordValid=await comparePassword(password,EmailFound);
        if(!passwordValid){
            return res.status(401).json({message:'Password is incorrect!'});
        }
        await jwtSign(res, EmailFound, 0)
        res.status(200).json({message:'Login successful!'});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:'Internal Server Error!'});
    }
}