const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { json } = require('stream/consumers');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});
 
const readTextFile = async (filePath) => {
    try {
      const text = await fs.readFile(filePath, 'utf8');
      return text; // string
    } catch (error) {
      throw new Error(`Olvasási hiba (text): ${error.message}`);
    }
  };

const readJsonFile = async (filePath) => {
    try {
        const raw = await fs.readFile(filePath, 'utf8');
        return JSON.parse(raw); // JS objektum/tömb
    } catch (error) {
        throw new Error(`Olvasási hiba (json): ${error.message}`);
    }
};

router.get('/readFile', async (request, response) => {
    try {
        const content = await readTextFile(path.join(__dirname, '../files/adatok.txt'))

        response.status(200).json({ result: content });

    }catch(error) {
        console.log('GET HIPA: ' , error)
        response.status(500).json({error: 'Szerver hipa'})
    }
})
  
  router.get('/beolvasas', async (request, response) => {
    try {
      const data = await readTextFile('files/szamok.txt');

      response.status(200).json({ data: data });
    } catch (error) {
      console.log('GET /api/read-json error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.get('/osszeg', async (request, response) => {
    try {
        const content = await readTextFile(path.join(__dirname, '../files/szamok.txt'))

        let numbers = content.split(',')
        let osszeg = 0;
        for(const item of numbers) {
            osszeg += parseInt(item)
        }

        response.status(200).json({ result: osszeg });

    }catch(error) {
        console.log('GET HIPA: ' , error)
        response.status(500).json({error: 'Szerver hipa'})
    }
})

router.get('/szorzat', async (request, response) => {
    try {
        const content = await readTextFile(path.join(__dirname, '../files/szamok.txt'))

        let numbers = content.split(',')
        let firstIndex;
        let lastIndex;

        for(let i = 0; i < numbers.length; i++) {
            if(i == 0) {
                firstIndex = numbers[i]
            }
            if(i == numbers.length - 1) {
                lastIndex = numbers[i]
            }
        }
        let szorzat = firstIndex*lastIndex;

        response.status(200).json({ result: szorzat });

    }catch(error) {
        console.log('GET HIPA: ' , error)
        response.status(500).json({error: 'Szerver hipa'})
    }
})

router.get('/atlag', async (request, response) => {
    try {
        const content = await readTextFile(path.join(__dirname, '../files/szamok.txt'))

        let numbers = content.split(',')
        let osszeg = 0;
        let db = 0;
        for(const item of numbers) {
            osszeg += parseInt(item)
            db ++;
        }

        let avg = osszeg / db;

        response.status(200).json({ result: avg });

    }catch(error) {
        console.log('GET HIPA: ' , error)
        response.status(500).json({error: 'Szerver hipa'})
    }
})

router.get('/min', async (request, response) => {
    try {
        const content = await readTextFile(path.join(__dirname, '../files/szamok.txt'))

        let numbers = content.split(',')
        let min = numbers[0];

        for(let i = 0; i < numbers.length; i++) {
            if(parseInt(min) > parseInt(numbers[i])) {
                min = numbers[i]
            }
        }

        response.status(200).json({ result: min });

    }catch(error) {
        console.log('GET HIPA: ' , error)
        response.status(500).json({error: 'Szerver hipa'})
    }
})

router.get('/max', async (request, response) => {
    try {
        const content = await readTextFile(path.join(__dirname, '../files/szamok.txt'))

        let numbers = content.split(',')
        let max = numbers[0];

        for(let i = 0; i < numbers.length; i++) {
            if(parseInt(max) < parseInt(numbers[i])) {
                max = numbers[i]
            }
        }

        response.status(200).json({ result: max });

    }catch(error) {
        console.log('GET HIPA: ' , error)
        response.status(500).json({error: 'Szerver hipa'})
    }
})

router.get('/rendezett', async (request, response) => {
    try {
        const content = await readTextFile(path.join(__dirname, '../files/szamok.txt'))
        let numbers = content.split(',')
        numbers.sort((a,b) => a - b);

        response.status(200).json({ result: numbers });

    }catch(error) {
        console.log('GET HIPA: ' , error)
        response.status(500).json({error: 'Szerver hipa'})
    }
})

router.get('/getallstat', async (request, response) => {
    try {
        const data = await readJsonFile(path.join(__dirname,'../files/statisztika.json'));
        response.status(200).json({ data: data });
  } catch (error) {
    console.log('GET /api/read-json error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }

})

router.get('/getstat/:telepaz', async (request, response) => {
    try {
        const data = await readJsonFile(path.join(__dirname,'../files/statisztika.json'));
        const telepaz = request.params.telepaz;

        for(let i = 0; i < data.length; i++) {
            if(data[i].telepules_azonosito == telepaz) {
                return response.status(200).json({ result: data[i] });
            }
        }

    } catch (error) {
        console.log('GET /api/read-json error:', error);
        response.status(500).json({ error: 'Internal server error' });
    }

})

router.get('/getvizsgazok', async (request,response) => {
    try {
        const data = await readJsonFile(path.join(__dirname,'../files/erettsegi.json'));
        const vizsgazok = data;

        return response.status(200).json({ result: vizsgazok });

    } catch (error) {
        console.log('GET /api/read-json error:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/getosztalyzatok', async (request, response) => {
    try {
        const data = await readJsonFile(path.join(__dirname,'../files/erettsegi.json'));

        const erettsegi = data.map(vizsgazo => {
            const osszSzazalek = Math.round(vizsgazo.Szovegszerkesztes + vizsgazo.Adatbaziskezeles + vizsgazo.Programozas + vizsgazo.Szobeli) / 150 * 100
            let osztalyzat;

            if(osszSzazalek >= 60) {
                osztalyzat = 5;
            } else if (osszSzazalek >= 47) {
                osztalyzat = 4;
            } else if (osszSzazalek >= 33) {
                osztalyzat = 3;
            } else if (osszSzazalek >= 25) {
                osztalyzat = 2;
            } else {
                osztalyzat = 1;
            }

            return {
                "Nev": vizsgazo.Nev,
                "Osszpont": vizsgazo.Szovegszerkesztes + vizsgazo.Adatbaziskezeles + vizsgazo.Programozas + vizsgazo.Szobeli,
                "Irasbeliszazalek": Math.round((vizsgazo.Szovegszerkesztes + vizsgazo.Adatbaziskezeles + vizsgazo.Programozas) / 120 * 100),
                "Szobeliszazalek": Math.round((vizsgazo.Szobeli / 30) * 100),
                "Osztalyzat": osztalyzat
                
            }
        })

        return response.status(200).json({result: erettsegi});

    } catch (error) {
        console.log('GET /api/read-json error:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/posttxt', async (request, response) => {
    try {
        let text = request.body;

        await fs.appendFile(path.join(__dirname, '../files/csapi.txt'), JSON.stringify(text), 'utf8');

        response.status(200).json({ message: 'Fájl sikeresen létrehozva.',
            sent: text });
    } catch (error) {
        console.log('POST HIBA:', error);
        response.status(500).json({ error: 'Szerver hiba' });
    }
});

router.post('/postjson', async (request, response) => {
    try {
        let jsonData = request.body;
        await fs.appendFile(path.join(__dirname, '../files/csapi.json'), JSON.stringify(jsonData), 'utf8');

        response.status(200).json({ message: 'JSON fájl sikeresen létrehozva.',
            sent: jsonData });
    } catch (error) {
        console.log('POST HIBA:', error);
        response.status(500).json({ error: 'Szerver hiba' });
    }
}); 

module.exports = router;
