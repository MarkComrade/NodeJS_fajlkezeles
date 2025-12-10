document.addEventListener('DOMContentLoaded', () => {

    getMethodFetch('api/readFile')
    .then((data) => {
        console.log('Fetch eredménye: ', data);

        appendText(data)
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

function appendText(data) {
    let div = document.getElementById('forText');
    let feladat = document.createElement('h1');
    feladat.setAttribute('class', 'display-4 shadow-sm text-start')

    let h1 = document.createElement('h1');
    h1.setAttribute('class', 'display-6 text-center');

    feladat.textContent = "1. Feladat";
    h1.textContent = "Eredmény: " + data.result;

    div.appendChild(feladat);
    div.appendChild(h1);
}