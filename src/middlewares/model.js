const fs = require("fs");
const path = require("path");
const model = (req, res, next) => {
    req.getData = function(fileName){
        let data = fs.readFileSync(path.join(process.cwd(), "database", `${fileName}.json` ), "utf-8");
        data = data ? JSON.parse(data): [];
        return data
    };
    req.writeData = function(fileName, data){
        fs.writeFileSync(path.join(process.cwd(), "database", `${fileName}.json`), JSON.stringify(data, null, 4));
        return data
    };
    req.youTubeUserName = function(username) {
        let newUserName = ''
        for(let i = 0; i<username.length; i++){
            if(i == 0) newUserName += username[i].toUpperCase()
            else newUserName += username[i].toLowerCase()
        }
        return newUserName;
    };
    req.saveUserImage = function(mv, imageName){
        const imagePath = path.join(process.cwd(), "src", "files", imageName.replaceAll(" ", ""));
        return mv(imagePath);
    };
    req.saveVideo = function(mv, videoName) {
        const videoPath = path.join(process.cwd(), "src", "videos", videoName);
        console.log(videoPath)
        return mv(videoPath)
    }
    return next();
}

module.exports = {model}