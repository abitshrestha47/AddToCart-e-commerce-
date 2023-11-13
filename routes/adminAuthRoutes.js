import express from 'express';
export const adminAuthRoutes=express.Router();
import {createAdmin,authenticateAdmin} from '../controllers/adminAuthController.js';

adminAuthRoutes.get('/admins/signup',(req,res)=>{
    res.render('adminSignup.ejs');
});

adminAuthRoutes.get('/admins/login',(req,res)=>{
    res.render('adminLogin.ejs');
});

adminAuthRoutes.post('/admins/signup',createAdmin);
adminAuthRoutes.post('/admins/login',authenticateAdmin);