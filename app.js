const express = require("express");
require("./config");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { register, leaderboard, getLeaderboard } = require("./routes/register");
const { sendMail } = require("./routes/sendMail");
const dotenv = require("dotenv");
const compression = require("compression");
dotenv.config();
const _app_folder = "./front-end/"
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

process.on('uncaughtException', function (err) {
    console.log('### BIG ONE (%s)', err);
});

app.post("/api/register", register);
app.get("/api/leaderboard", leaderboard);
//app.get("/leaderboard", getLeaderboard);
app.post("/api/sendMail", sendMail);
app.get('*.*', express.static(_app_folder));
app.all('*', (req, res) => {
    res.status(200).sendFile('/', { root: _app_folder })
})

app.listen(port = process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${port}`);
});