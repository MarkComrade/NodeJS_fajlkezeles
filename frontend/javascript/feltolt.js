document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('feltoltes').addEventListener('click', feltolt);
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
        if(!response.ok) {
            throw new Error('POST hiba: ', `${response.status}, ${response.message}`)
        }
        return await response.json();
    }catch(error){
        throw new Error('Hiba történt ', `${error.message}`)
    }   
}

const feltolt = async () => {
    document.getElementById('')
}