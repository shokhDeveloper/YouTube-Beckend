const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path")
const fileUpload = require("express-fileupload")
const {PORT, host} = require("./lib/network")
const {authRouter} = require("./router/authRouter")
const {model} = require("./middlewares/model")
const toCheck = require("./middlewares/toCheckUser")
const {authToken} = require("./middlewares/authToken")
const {videoRouter} = require("./router/videoRouter");
const { querySearch } = require("./middlewares/querySearch");
const { userRouter } = require("./router/userRouter");
const app = express();
// const allowOrigins = ["http://192.168.1.108:5000"];

// const corsOptions = {
//     origin: function(origin, callBack){
//        if(allowOrigins.includes(origin)){
//         callBack(null, true)
//        } else{
//         callBack(new Error("Cors ERROR"))
//        }
//     }
// }

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json())
app.use(fileUpload());
app.use(model);
app.use(toCheck)
app.use(querySearch);

app.use("/auth", authRouter );
app.use("/users", userRouter);
app.use("/video", videoRouter);

app.get("/download/:downloadVideo", (req, res) => {
    try{
        const {downloadVideo} = req.params;
        const videoPath = path.join(__dirname, "videos", downloadVideo);
        const type = fs.existsSync(videoPath);
        if(type){
            res.download(videoPath)
        }
    }catch(error){
        return res.status(400).json({message: error})
    }
})


app.use(authToken);

app.listen(PORT, () => {    
    console.log(`Server is running ${host}`)
})
