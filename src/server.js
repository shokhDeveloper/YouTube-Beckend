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
const app = express();

const allowOrigins = ["http://192.168.1.108:5000"];

const corsOptions = {
    origin: function(origin, callBack){
       if(allowOrigins.includes(origin)){
        callBack(null, true)
       } else{
        callBack(new Error("Cors ERROR"))
       }
    }
}

app.use(cors(corsOptions));
app.use(express.json())

app.use(fileUpload());
app.use(model);
app.use(toCheck)

app.use("/auth", authRouter );
app.use(authToken)

app.use(querySearch)
app.get("/users", (req, res) => {
    let users = JSON.parse(fs.readFileSync(path.join(process.cwd(), "database", "users.json")))
    res.json(users)
});

app.use("/video", videoRouter)

app.listen(PORT, () => {    
    console.log(`Server is running ${host}`)
})
