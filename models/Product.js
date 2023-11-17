import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productImage:{
        type:String,
        required:true,
    },
    productQuantity:{
        type:Number,
        required:true,
    },
    productDescription:{
        type:String,
        required:true,
    },
});

export const Product=mongoose.model('products',ProductSchema);
