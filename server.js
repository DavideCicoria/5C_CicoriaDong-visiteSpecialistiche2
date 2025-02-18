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
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

app.post('/booking/add', async (req, res) => {
    try {
        //console.log(req.body);
        let reservation = {};
        let reservationSplit = req.body.split("-");
        reservation.idType = reservationSplit[0];
        let tmp = reservationSplit[1].split("/");
        let newDate = tmp[2] + '-' + tmp[1] + '-' + tmp[0];
        reservation.date = newDate;
        reservation.hour = reservation[2];
        console.log(JSON.parse(reservation));


        await db.insert(reservation);
        res.send('Prenotazione inserita con successo!');
    } catch (error) {
        res.send('Errore nell\'inserimento della prenotazione');
    }
});

app.get('/booking', async (req, res) => {
    try {
        const bookings = await db.selectAll();
        bookings.forEach(booking => {
            booking.date = new Date(booking.date).toISOString().split('T')[0].split("-").reverse().join("-");
        });
        res.json(bookings);
    } catch (error) {
        res.send('Errore nel recupero delle prenotazioni');
    }
});


server.listen(5500, () => {
    console.log("- server running");
});

