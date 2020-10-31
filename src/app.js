const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const upload = multer();
const app = express();
const authMiddleware = require("./auth.js");
const codes = require("./codes.js");
const users = require("./users.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname, { dotfiles: "allow" }));
app.use(bodyParser.json());
app.use(upload.array());
app.use(authMiddleware);
app.use(cors());
app.use("/code", codes);
app.use("/user", users);

app.listen(process.env.PORT || 3000);
