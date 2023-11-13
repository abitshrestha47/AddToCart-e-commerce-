import express from 'express';
const app=express();
import 'dotenv/config';
const PORT=process.env.PORT;
import { connectDB } from './config/db.js';
import * as url from 'url';
import path from 'path';
import {adminAuthRoutes} from './routes/adminAuthRoutes.js';
connectDB();

app.use(express.urlencoded({extended:true}));
const __dirname=url.fileURLToPath(new URL('.',import.meta.url));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'public','views'));
app.use('/',adminAuthRoutes);
app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`);
});