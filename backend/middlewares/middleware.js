const jsonwebtoken = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization 

    if(!authHeader ||!authHeader.startsWith('Bearer')){
        return res.status('403').json({
            "message":"middleware error "
        })
    }
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jsonwebtoken.verify(token,JWT_SECRET)
        req.userId =decoded.userId
        console.log(req.userId)
        next()

    } catch (error) {
        return res.status(403).json({
            message:"Error occur"
        })
    }


}

module.exports ={
    authMiddleware
}
