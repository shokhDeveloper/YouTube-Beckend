const userRouter = require("express").Router();
const { userController } = require("../controller/user");
userRouter.route("/").get(userController.GET);
userRouter.route("/:userId").get(userController.GET);
module.exports = {userRouter}