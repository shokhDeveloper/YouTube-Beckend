const path = require("path");
const regexLetter = /[A-Za-z]/;
const regexNumber = /[0-9]/;
const regexDate =  /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/;
const Validator = (req, res, next) => {
    try{
        const {username, password} = req.body;
        if(!username) throw new Error("Username its required !");
        if(!password) throw new Error("Password its required !");
        
        if(!username.length || username.length < 4 || username.length > 16 ) throw new Error("Username its invalid !")
        if(!regexLetter.test(password) || !regexNumber.test(password)) throw new Error("Password its invalid !");
        
        if(req.url == "/register"){
            const IMAGE_EXTNAMES = [".png", ".jpeg", ".webp", ".svg", ".jpg"];
            if(!req.files?.file) throw new Error("The user image its required !")
            const {file:{name}} = req.files;
            const {ext} = path.parse(name);
            if(!IMAGE_EXTNAMES.includes(ext)) throw new Error("Invalid file or image !")
        }        

        return next();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}
const VideoValidator = (req, res, next) => {
    try{
        const {video} = req.files;
        const {video_title, userId, birth_date} = req.body;
        
        if(!video_title) throw new Error("The video title its required !");
        if(!userId) throw new Error("The user id is not found !")
        if(!birth_date) throw new Error("The birth_date its required !")
        if(!video) throw new Error("The video not found !");
        
        if(video_title.length <= 2 || video_title.length > 16) throw new Error("The video title its invalid !");
        if(!regexDate.test(birth_date)) throw new Error(`The birth_date its invalid ! example: ${new Date().toLocaleDateString().split(".").reverse().join(".")}`)

        if(video.name){
            const videoFormats = [".mp4", ".mov", ".avi", ".wmv", ".avchd", ".webm", ".fly"];
            const videoFormat = path.extname(video.name);
            if(!videoFormats.includes(videoFormat)) throw new Error("The video its invalid !")
        
            return next(); 
        }else throw new Error("The video name not found !")
        
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}
function UpdateVideoValidator (req, res, next){
    try{
        const {video_title} = req.body;
        if(!video_title) throw new Error("The video title its required !");

        if(video_title.length <= 2 || video_title.length > 16) throw new Error("The video title its invalid !");

        return next()
    }   catch(error){
        return res.status(400).json({message: error.message})
    }
}
module.exports = {USER_VALIDATOR: Validator, VIDEO_UPLOAD_VALIDATOR: VideoValidator, UPDATE_VIDEO_VALIDATOR: UpdateVideoValidator};       