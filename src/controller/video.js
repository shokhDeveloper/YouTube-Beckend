const fs = require("fs");
const path = require("node:path");
const videoController = {
  POST: function (req, res) {
    try {
      const data = req.getData("data");
      const { video } = req.files;
      let videoName = video.name.replaceAll(" ", "");
      const newData = {
        ...req.body,
        videoName,
        id: data.length ? data[data.length - 1].id + 1 : 1,
      };
      data.push(newData);
      req.writeData("data", data);
      if (!video.data.length) throw new Error("The video its invalid !");
      const videoMb = Math.round(video.data.length / (1024 * 1024));
      if (videoMb > 200)
        throw new Error(
          "The video mb is too big server can only accept up to 200 mb !"
        );
      req.saveVideo(video.mv, videoName);
      res.status(201).json({
        message: "The video successfull created !",
        statusCode: 201,
        video_data: newData,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  GET: function (req, res) {
    const data = req.getData("data");
    let params = req.params;
    if (Object.keys(params).length) {
      let { videoName } = req.params;
      const videoPath = path.join(process.cwd(), "src", "videos", videoName);
      return res.status(200).sendFile(videoPath);
    }
    if (Object.keys(req.query).length) {
      let searchData = req.searchData(data, req.query);
      return res.status(200).json(searchData);
    }
    return res.status(200).json(data);
  },
  PUT: function (req, res) {
    try {
      let data = req.getData("data");
      const { dataId } = req.params;
      const idx = data.findIndex((videoData) => videoData.id == dataId);
      let newData = { ...data[idx], ...req.body };
      data[idx] = newData;
      req.writeData("data", data);
      res
        .status(200)
        .json({
          message: "The data successfull updated",
          data: data[idx],
          statusCode: 200,
        });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  DELETE: function (req, res) {
    try {
      const data = req.getData("data");
      const { dataId } = req.params;
      const idx = data.findIndex((videoData) => videoData.videoName == dataId);
      if (idx >= 0) {
        const videoPath = path.join(process.cwd(), "src", "videos", dataId);

        fs.unlink(videoPath, (err) => {
          if (err) {
            res.status(400).json({ message: "ERROR" });
          } else {
            data.splice(idx, 1);
            req.writeData("data", data);
            res.status(200).json({ message: "The data successfull deleted" });
          }
        });
      } else {
        res.status(400).json({ message: "The data or id not found !" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = { videoController };
