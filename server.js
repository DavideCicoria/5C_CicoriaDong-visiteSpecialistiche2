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

server.listen(5500, () => {
    console.log("- server running");
});

app.use("/", express.static(path.join(__dirname, "public")));

/*
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single('file');
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.post("/image/add", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore durante il caricamento del file" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Nessun file caricato" });
    }
    const image = { url: "/files/" + req.file.filename };
    serverDB.insert(image)
      .then(() => {
        serverDB.test();
        res.json({ url: image.url });
      })
      .catch(error => res.status(500).json({ error: "Errore durante l'inserimento nel database" }));
  });
});

 app.get("/image", async (req, res) => {
    try {
        const images = await serverDB.select();
        res.json({ images:images });
    } catch (error) {
        res.status(500).json({ error: "Errore del server" });
    }
});
app.delete("/image/:id", async (req, res) => {
    try {
      await serverDB.del(req.params.id); 
      res.json({ result: "Ok" });
    } catch (error) {
      res.status(500).json({ error: "Errore durante l'eliminazione" });
    }
  });
  const server = http.createServer(app);

  server.listen(5500, () => {
  
    console.log("- server running");
  
  });
  //serverDB.insert({url:"/files/storia1.jpg"});
serverDB.test();

*/