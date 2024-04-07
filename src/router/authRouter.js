const authRouter = require("express").Router();

const {USER_VALIDATOR} = require("../middlewares/validator")
const {authController} = require("../controller/auth")

authRouter.route("/register").post(USER_VALIDATOR, authController.REGISTER)
authRouter.route("/login").post(USER_VALIDATOR,  authController.LOGIN)

module.exports = {authRouter}