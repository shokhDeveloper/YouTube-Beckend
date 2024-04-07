const { sign } = require("jsonwebtoken")
const crypt = require("sha256")
const authController = {
    REGISTER: function(req, res) {
        try {
            const users = req.getData("users");
            const { username, password } = req.body;
            const { file: { mv, name } } = req.files;
            const typeRegister = req.toCheckUser(username, "register");

            if (typeRegister) {
                const hashedPassword = crypt(password);

                const user = {
                    username: req.youTubeUserName(username),
                    password: hashedPassword,
                    user_image: name.trim().replaceAll(" ", ""),
                    userId: users?.length ? users[users.length - 1].userId + 1 : 1
                };

                users.push(user);
                req.writeData("users", users);
                req.saveUserImage(mv, name);

                const accessToken = sign(
                    { userId: user.userId, userAgent: req.headers["user-agent"] },
                    "YouTube_SECRET_KEY",
                    { expiresIn: "1d" }
                );

                res.status(200).json({
                    message: "The user was successfully registered!",
                    user,
                    accessToken
                });
            } else {
                res.status(400).json({ message: "The username has already been taken!", username });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
        
    },
    LOGIN: function(req, res) {
        try{
            const {username} = req.body
            const {type, user} = req.toCheckUser(username, "login")
            if(type){
                res.status(200).json({
                    message: "The user successfull login",
                    user,
                    accessToken: sign({userId: user.userId, userAgent: req.headers["user-agent"] }, "YouTube_SECRET_KEY", {expiresIn: "1d"}),
                    statusCode: 200
                })
            }else{
                res.status(404).json({
                    message: "User is not defiened",
                    statusCode: 404
                })
            }
        }catch(error){
            return res.json({message: error.message})
        }
    }
}
module.exports = {authController}