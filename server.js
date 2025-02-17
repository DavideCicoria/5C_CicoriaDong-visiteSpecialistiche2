//const fs = require('fs');
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
//const serverDB = require("./serverDB.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const path = require('path');

const server = http.createServer(app);

app.use("/", express.static(path.join(__dirname, "public")));

server.listen(5500, () => {
    console.log("- server running");
});

