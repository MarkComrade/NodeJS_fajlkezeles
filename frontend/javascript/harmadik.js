document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - Harmadik.js');
    getMethodFetch('api/getallstat')
    .then((data) => {
        console.log('Fetch eredménye nigger : ', data);
        
        createSelect(data);
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

const createSelect = async (data) => {

    let div = document.getElementById('asd');
    let telepulesek = await data;

    let select = document.createElement('select')

    for(let i = 0; i < telepulesek.data.length; i++) {
        let option = document.createElement('option')

        option.textContent = telepulesek.data[i].telepaz;
        select.appendChild(option)
    }
    div.appendChild(select);

}