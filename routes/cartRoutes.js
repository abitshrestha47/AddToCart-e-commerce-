import express from 'express';
export const cartRouter=express.Router();
import { addCart, getSingleCart } from '../controllers/cartController.js';
import { validateJWT } from '../utils/jwtUtils.js';

cartRouter.post('/carts',validateJWT(1),addCart);
cartRouter.get('/my-carts',validateJWT(1),getSingleCart);
