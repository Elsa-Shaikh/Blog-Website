import jwt from "jsonwebtoken";

export const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1];
   if(token == null){
    return res.status(401).json({msg:'Token is missing'});
   }
   jwt.verify(token,process.env.ACCESS_KEY,(error,user)=>{
    if(error){
        return res.status(400).json({msg:'Invalid Token'});
    }
    req.user=user;
    next();
   })
}
