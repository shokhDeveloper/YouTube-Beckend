const toCheck = (req, _, next) => {
    req.toCheckUser = (username, type) => {
        const users = req.getData("users")
        if(type == "register" && !users.some(user => user.username.trim().toLowerCase() == username.trim().toLowerCase())) return true
        if(type == "login" && users.some((user) => user.username.toLowerCase() == username.toLowerCase())) return {type: true, user: users.find(user => user.username.toLowerCase() == username.toLowerCase())}
        return false
    }
    req.authTokenUser = function(userId, userAgent) {
        const users = req.getData("users");
        if(users.some(user => user.userId == userId) && req.headers["user-agent"] == userAgent) return true;
        return false 
    };
    return next()
}
module.exports = toCheck