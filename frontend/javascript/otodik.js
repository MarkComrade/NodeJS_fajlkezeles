document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('komb').addEventListener('click', sendData);
})

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':  'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`POST hiba: ${response.status} ${response.statusText}`);
    }
    return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
};

const sendData = async () => { 
    try {
        const surname = document.getElementById('surname').value;
        const firstname = document.getElementById('firstname').value;
        const genderSelect = document.getElementById('genderSelect').value;
        const datum = document.getElementById('datum').value;
        const momname = document.getElementById('momname').value;
        const useremail = document.getElementById('useremail').value;
        const phone = document.getElementById('phone').value;
    
        const response = await postMethodFetch('api/posttxt', {
            surname: surname,
            firstname: firstname,
            genderSelect: genderSelect,
            datum: datum,
            momname: momname,
            useremail: useremail,
            phone: phone
        });
        console.log(response);
    } catch (error) {
        console.error('Hiba: ', error.message);
    }

    sendJson();
};

const sendJson = async () => { 
    try {
        const surname = document.getElementById('surname').value;
        const firstname = document.getElementById('firstname').value;
        const genderSelect = document.getElementById('genderSelect').value;
        const datum = document.getElementById('datum').value;
        const momname = document.getElementById('momname').value;
        const useremail = document.getElementById('useremail').value;
        const phone = document.getElementById('phone').value;
    
        const response = await postMethodFetch('api/postjson', {
            surname: surname,
            firstname: firstname,
            genderSelect: genderSelect,
            datum: datum,
            momname: momname,
            useremail: useremail,
            phone: phone
        });
        console.log(response);
    } catch (error) {
        console.error('Hiba: ', error.message);
    }

};