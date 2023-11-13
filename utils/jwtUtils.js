import jwt from 'jsonwebtoken';
const ADMIN_SECRET_KEY=process.env.ADMIN_SECRET_KEY;
const USER_SECRET_KEY=process.env.USER_SECRET_KEY;

export const jwtSign=(res,token_holder,type)=>{
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