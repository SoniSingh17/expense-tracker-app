const jwt = require("jsonwebtoken")
require("dotenv").config();
const ensureAuthenticated = (req , res , next)=>{
    const token = req.headers.authorization;
    if (!token){
        return res.status(401).json({
            message : "Unauthorized Used",
            success : false
        })
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded;


        next()
        
    } catch (err) {
        return res.status(401).json({
            message : "Unauthorized User !"
        })
        
    }


}

module.exports = ensureAuthenticated;