import bcrypt from 'bcrypt';

export const hashPassword=async function (plainText){
    const hash=await bcrypt.hash(plainText,10);
    return hash;
}

export const comparePassword=async function(plainText,user){
    const valid=await bcrypt.compare(plainText,user.password);
    return valid;
}

