import { Product } from "../models/Product.js";
import path from 'path';
import * as url from 'url';
import fs from 'fs';
const __dirname=url.fileURLToPath(new URL('.',import.meta.url));
export const addProduct = async (req, res) => {
  const { productName, productPrice, productQuantity, productDescription } =
    req.body;
  const productImage = req.file.filename;
  try {
    const product = new Product({
      productName,
      productPrice,
      productQuantity,
      productDescription,
      productImage,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    if (req.params.id) {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      const products = await Product.find({});
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: "Product is empty" });
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editProduct=async(req,res)=>{
  const updateData={...req.body};
  const id=req.params.id;
  try{
    if(req.file){
      const existingProduct=await Product.findById(id);
      if(!existingProduct){
        return res.status(404).json({message:'Product not found'});
      }
      if(existingProduct.productImage){
        unlinkImagePath(existingProduct.productImage);
      }
      updateData.productImage=req.file.filename;      
    }
    if(id){
      const editProduct=await Product.findByIdAndUpdate(id,updateData);
      await editProduct.save();
        res.status(200).json(editProduct);
    }
  }catch(err){
    console.log(err.message);
    res.status(500).json({message:'Internal Server Error'});
  }
}

export const deleteProduct=async(req,res)=>{
    const id=req.params.id;
    try{
      const deletingProduct=await Product.findByIdAndDelete(id);
      if(!deletingProduct){
        return res.status(404).json({ message: "Product not found" });
      }else{
        if(deletingProduct.productImage){
          unlinkImagePath(deletingProduct.productImage);
        }
        res.status(204).end();
      }
    }catch(err){
      console.log(err.message);
    }
}

function unlinkImagePath(imgUnlink){
  const imagePath=path.join(__dirname,'..','public','assets','images');
  const imagePath_img=path.join(imagePath,imgUnlink);
  fs.unlink(imagePath_img,(err)=>{
    if(err){
      console.log('Error:',
      err.message);
    }
  })
}

