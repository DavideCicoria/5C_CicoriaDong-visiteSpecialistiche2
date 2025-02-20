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
db.selectAll();
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

        let reservation = {};

        let key = Object.keys(req.body)[0]; 
        let value = req.body[key]; 
        let reservationSplit = key.split("-"); 
        let idType = await db.selectIdType(reservationSplit[0]);
        reservation.idType = idType[0].id;
        let tmp = reservationSplit[1].split("/");
        let newDate = tmp[2] + "-" + tmp[1] + "-" + tmp[0];
        reservation.date = newDate;
        reservation.hour = reservationSplit[2]; 
        reservation.name = value;

        await db.insert(reservation);
        res.send('Prenotazione inserita con successo!');
    } catch (error) {
        res.send('Errore nell\'inserimento della prenotazione');
    }
});

app.get('/booking/', async (req, res) => {
    try {
        const bookings = await db.selectAll();
        bookings.forEach(booking => {
            booking.date = new Date(booking.date).toLocaleDateString('it-IT').split('T')[0].split("-").reverse().join("/");
        });

        let transfBooking = {};

        for (const item of bookings) {
            const key = item.type + "-" + item.date + "-" + item.hour;
            transfBooking[key] = item.name;
        }

        res.json(transfBooking);
    } catch (error) {
        res.send('Errore nel recupero delle prenotazioni');
    }
});


server.listen(80, () => {
    console.log("- server running");
});

