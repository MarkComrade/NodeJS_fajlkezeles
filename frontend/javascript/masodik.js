document.addEventListener('DOMContentLoaded', () => {

    getMethodFetch('api/beolvasas')
    .then((data) => {
        console.log('Fetch eredménye: ', data);

    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/osszeg')
    .then((data) => {
        console.log('Fetch eredménye: ', data);

    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/szorzat')
    .then((data) => {
        console.log('Fetch eredménye: ', data);

    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/atlag')
    .then((data) => {
        console.log('Fetch eredménye: ', data);

    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/min')
    .then((data) => {
        console.log('Fetch eredménye min: ', data);

    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/max')
    .then((data) => {
        console.log('Fetch eredménye max: ', data);

    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/rendezett')
    .then((data) => {
        console.log('Fetch eredménye: ', data);

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