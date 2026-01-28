//!Module-ok importálása
const express = require('express'); //?npm install express
const session = require('express-session'); //?npm install express-session
const path = require('path');
const fsSync = require('fs');

//!Beállítások
const app = express();
const router = express.Router();

const ip = '127.0.0.1';
const port = 3000;

app.use(express.json()); //?Middleware JSON
app.set('trust proxy', 1); //?Middleware Proxy

//!Session beállítása:
app.use(
    session({
        secret: 'titkos_kulcs', //?Ezt generálni kell a későbbiekben
        resave: false,
        saveUninitialized: true
    })
);

//!Routing
//?Főoldal:
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

router.get('/masodik.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/masodik.html'));
});

router.get('/harmadik.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/harmadik.html'));
});

router.get('/negyedik.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/negyedik.html'));
});

router.get('/otodik.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/otodik.html'));
});

router.get('/hatodik.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/hatodik.html'));
});

router.get('/feltolt.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/feltolt.html'));
});

router.get('/megjelenit.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/megjelenit.html'));
});
//!CSOVES

const writeSync = () => {
    let numberArray = []

    for(let i = 0; i < 20; i++) {
        numberArray.push(Math.floor(Math.random() * (50 - 1 + 1)) + 1);
    }
    console.log(numberArray); 

    fsSync.writeFileSync(
        path.join(__dirname, '../backend/files/szamok.txt'), numberArray.join(','), 'utf8'
    );
}

writeSync();

//!API endpoints
app.use('/', router);
const endpoints = require('./api/api.js');
const { write } = require('fs');
app.use('/api', endpoints);

//!Szerver futtatása
app.use(express.static(path.join(__dirname, '../frontend'))); //?frontend mappa tartalmának betöltése az oldal működéséhez
app.listen(port, ip, () => {
    console.log(`Szerver elérhetősége: http://${ip}:${port}`);
});

//?Szerver futtatása terminalból: npm run dev
//?Szerver leállítása (MacBook és Windows): Control + C
//?Terminal ablak tartalmának törlése (MacBook): Command + K
