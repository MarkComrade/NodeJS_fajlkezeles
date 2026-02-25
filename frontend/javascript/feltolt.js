document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('feltolt').addEventListener('click', feltolt);
});

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

const postMethodFetch = async (url, data) => {
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        if(!response.ok) {
            throw new Error('POST hiba: ', `${response.status}, ${response.message}`)
        }
        return await response.json();
        
    }catch(error){
        throw new Error('Hiba történt ', `${error.message}`)
    }   
}

const feltolt = async () => {
    let nev = document.getElementById('nev').value;
    console.log(nev);
    let pozicio = document.getElementById('pozicio').value;
    console.log(pozicio);
    let szuletes = document.getElementById('szuletes').value;
    console.log(szuletes);
    let fizetes = document.getElementById('fizetes').value;
    console.log(fizetes);

    const ujDolgozo = {
        nev: nev,
        pozicio: pozicio,
        szuletes: szuletes,
        fizetes: fizetes
    };

    console.log(ujDolgozo);

    try{
        const response = await postMethodFetch('/api/employeesAdd', ujDolgozo);
        console.log('Új dolgozó hozzáadva:', response);
    }catch(error){
        console.error('Hiba történt a feltöltés során:', error);
    }
}