//const fs = require('fs');
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const DBManager = require('./DBManager');
const conf = JSON.parse(fs.readFileSync('conf.json'));
conf.ssl.ca = fs.readFileSync(__dirname + '/ca.pem');
db = DBManager(conf);
db.createTable();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const path = require('path');
const server = http.createServer(app);

app.use("/", express.static(path.join(__dirname, "public")));

app.post('/booking/add', async (req, res) => {
    try {
        await db.insert(req.body);
        res.send('Prenotazione inserita con successo!');
    } catch (error) {
        res.send('Errore nell\'inserimento della prenotazione');
    }
});

app.get('/booking/', async (req, res) => {
    try {
        const bookings = await db.selectAll();
        res.json(bookings);
    } catch (error) {
        res.send('Errore nel recupero delle prenotazioni');
    }
});


server.listen(5500, () => {
    console.log("- server running");
});

