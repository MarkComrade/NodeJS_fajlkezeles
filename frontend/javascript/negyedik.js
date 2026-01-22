document.addEventListener('DOMContentLoaded', () => {
    getMethodFetch('api/getvizsgazok')
    .then((data) => {
        console.log('Fetch eredménye nigger 67 : ', data);
        createOptions(data)

    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/getosztalyzatok')
    .then((data) => {
        console.log('Fetch eredménye nigger 67 : ', data);
        document.getElementById('loadBtn').addEventListener('click', () => createTable(data))
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });
})

const getMethodFetch = async (url) => {
    try{

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error('GET hiba: ', `${response.status}, ${response.message}`)
        }

        return await response.json();

    }catch(error){
        throw new Error('Hiba történt ', `${error.message}`)
    }
}

const createOptions = async(data) => {
    const select = document.getElementById('studentSelect')

    for(let i = 0; i < data.result.length; i++) {
        let option = document.createElement('option');
        option.textContent = data.result[i].Nev;
        option.id = i + 1;
        select.appendChild(option)
    }

    select.addEventListener('change', () => appendData(data))
}

const appendData = async(data) => {
    const select = document.getElementById('studentSelect')
    const nev = document.getElementById('nev')
    const szoveg = document.getElementById('szoveg')
    const adat = document.getElementById('adat')
    const prog = document.getElementById('prog')
    const szobeli = document.getElementById('szobeli')

    nev.textContent = data.result[select.selectedIndex].Nev
    szoveg.textContent = data.result[select.selectedIndex].Szovegszerkesztes
    adat.textContent = data.result[select.selectedIndex].Adatbaziskezeles
    prog.textContent = data.result[select.selectedIndex].Programozas
    szobeli.textContent = data.result[select.selectedIndex].Szobeli
}

const createTable = async(data) => {
    const table = document.getElementById('tablazat');
    table.hidden = false;
    const tableBody = document.getElementById('tableBody');
    for(let i = 0; i < data.result.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.result[i].Nev}</td>
            <td>${data.result[i].Osszpont}</td>
            <td>${data.result[i].Irasbeliszazalek}</td>
            <td>${data.result[i].Szobeliszazalek}</td>
            <td>${data.result[i].Osztalyzat}</td>
        `;
        tableBody.appendChild(row);
    }
}