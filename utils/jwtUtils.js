import jwt from 'jsonwebtoken';
const ADMIN_SECRET_KEY=process.env.ADMIN_SECRET_KEY;
const USER_SECRET_KEY=process.env.USER_SECRET_KEY;

export const jwtSign=async (res,token_holder,type)=>{
    if(type===0){
        const token=jwt.sign(
            {_id:token_holder?._id,email:token_holder?.email,userType:'admin'},
            ADMIN_SECRET_KEY,
            {
                expiresIn:'1hr',
            }
        );
        res.cookie('access_token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
        });
    }
}

export const validateJWT=(type)=>async(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(401).json({message:'Missing token!'});
    }
    try{
        if(type===0){
            decodeToken(token,ADMIN_SECRET_KEY);
            return next();
        }
    }catch(err){
        console.log(err.name);
        if(err.name==='TokenExpiredError'){
            return res.status(401).json({message:'Token expired!'});
        }else{
            return res.status(403).json({message:'Internal Server Error'});
        }
    }
}

export const decodeToken=(token,SECRET_KEY)=>{
    return jwt.verify(token,SECRET_KEY);
}
