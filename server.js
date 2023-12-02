import express from 'express';
const app=express();
import 'dotenv/config';
const PORT=process.env.PORT;
import { connectDB } from './config/db.js';
import * as url from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import {adminAuthRoutes} from './routes/adminAuthRoutes.js';
import { productRoutes } from './routes/productRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { cartRouter } from './routes/cartRoutes.js';
connectDB();


app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const __dirname=url.fileURLToPath(new URL('.',import.meta.url));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'public','views'));
app.use(express.static(path.resolve(__dirname,'public','assets')));
app.use(express.static('public', { 'extensions': ['html', 'htm', 'js'] }));
app.use('/',adminAuthRoutes);
app.use('/',productRoutes);
app.use('/',userRouter);
app.use('/',cartRouter);
app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`);
});