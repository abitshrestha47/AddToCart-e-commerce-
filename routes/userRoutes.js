import express from 'express';
export const userRouter=express.Router();
import { createUser,authenticateUser} from '../controllers/userController.js';
import { validateJWT } from '../utils/jwtUtils.js';

userRouter.get('/',(req,res)=>{
    const currentPage='home';
    res.render('index.ejs',{currentPage});
});

userRouter.get('/cart-page',validateJWT(1),(req,res)=>{
    const currentPage='carts';
    res.render('userCarts.ejs',{currentPage});
});

userRouter.get('/users/signup',(req,res)=>{
    res.render('userSignup.ejs');
});

userRouter.get('/users/login',(req,res)=>{
    res.render('userLogin.ejs');
});

userRouter.get('/users/login',(req,res)=>{
    res.render('userLogin.ejs');
});

userRouter.post('/users/login',authenticateUser);

userRouter.post('/users/signup',createUser);