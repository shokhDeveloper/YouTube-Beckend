const videoRouter = require("express").Router();
const {VIDEO_UPLOAD_VALIDATOR, UPDATE_VIDEO_VALIDATOR} = require("../middlewares/validator")
const {videoController} = require("../controller/video");

videoRouter.route("/").get(videoController.GET);
videoRouter.route("/upload").post(VIDEO_UPLOAD_VALIDATOR , videoController.POST);
videoRouter.route("/:videoName").get(videoController.GET)
videoRouter.route("/:dataId").put(UPDATE_VIDEO_VALIDATOR ,videoController.PUT).delete(videoController.DELETE);

module.exports = {videoRouter}