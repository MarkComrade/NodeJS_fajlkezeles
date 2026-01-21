document.addEventListener('DOMContentLoaded', () => {
    getMethodFetch('api/getvizsgazok')
    .then((data) => {
        console.log('Fetch eredménye nigger 67 : ', data);
        
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/getosztalyzatok')
    .then((data) => {
        console.log('Fetch eredménye nigger 67 : ', data);
        
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