import jwt from "jsonwebtoken"

export function verifyJWT(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startWith("Bearer")){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
const token = authHeader.split(" ")[1]
try {
    const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    )
    req.user = decoded
    next()
    
} catch (error) {
    return res.status(401).json({
        message : "Invalid token"
    })
}
}