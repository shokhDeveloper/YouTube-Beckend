const {verify} = require("jsonwebtoken");
const authToken = (req, res, next) => {
    try{
        const {token} = req.headers
        const {userId, userAgent} = verify(token, "YouTube_SECRET_KEY");
        if(userId && userAgent){
            const typeAuthTokenUser = req.authTokenUser(userId, userAgent);
            if(typeAuthTokenUser){
                return next();
            }else throw new Error("Your token has expired !")
        }else throw new Error("The token its invalid !")
    }catch(error){
        return res.status(401).json({message: error.message})
    }
}

module.exports = {authToken};