import { Cart } from "../models/Cart.js";
import { decodeToken } from "../utils/jwtUtils.js";
const USER_SECRET_KEY=process.env.USER_SECRET_KEY;

export const addCart=async (req,res)=>{
    const userToken=req.cookies.access_token;
    const {productId,quantity,total}=req.body;
    try{
        const decodedToken=decodeToken(userToken,USER_SECRET_KEY);
        const userId=decodedToken._id;
        const cart=new Cart({user:userId,product:productId,quantity:quantity,total:total});
        await cart.save();
        res.status(200).json({message:'cart added successfully!'});
    }catch(err){
        console.log(err.message);
    }
}

export const getSingleCart=async(req,res)=>{
    const userToken=req.cookies.access_token;
    try{
        const decodedToken=decodeToken(userToken,USER_SECRET_KEY);
        const userId=decodedToken._id;
        const cart=await Cart.find({user:userId});
        res.status(200).json(cart);
    }catch(err){
        console.log(err.message);
}}