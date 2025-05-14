const jwt  = require('jsonwebtoken')


const authMiddleware = (req,res,next)=>{
    // console.log('Auth middleware is called');
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(401).json({
            success:false,
            message:'Access denied. No token provided'
        })
    }
    
    // decode token
    
    try{
        const decodedTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodedTokenInfo)

        req.userInfo = decodedTokenInfo
        next();
        
    }catch(error){
        res.status(401).json({
            success:false,
            message:'Access denied. No token provided'
        })

    }

}

module.exports = authMiddleware;