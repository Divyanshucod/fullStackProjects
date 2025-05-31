const {JWT_SECRET} = require('./config')

const jwt = require('jsonwebtoken')

const authMiddleWare = (req,res,next)=>{
    //authenticate the user
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const token = authHeader.split(' ')[1];
    
    try {
         const decoded = jwt.verify(token,JWT_SECRET);
         req.userId = decoded.id;
         next();
    } catch (error) {
       return res.status(403).json({
            message:"Un-authorized Access!"
        })
    }

}

module.exports = {
    authMiddleWare 
}