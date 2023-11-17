import express from 'express';
export const productRoutes=express.Router();
import { upload } from '../utils/multerConfig.js';
import {validateJWT} from '../utils/jwtUtils.js';
import { addProduct,getProduct,editProduct} from '../controllers/productController.js';


productRoutes.get('/product-dashboard',validateJWT(0),(req,res)=>{
    res.render('productDashboard.ejs');
});

productRoutes.post('/products',upload.single('productImage'),addProduct);
productRoutes.get('/products',getProduct);
productRoutes.get('/products/:id',getProduct);
productRoutes.patch('/products/:id',upload.single('productImage'),editProduct);
