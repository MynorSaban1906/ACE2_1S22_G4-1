export async function getArduinoData(urlDB) {
    return fetch(urlDB, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            mode: "no-cors",
        },
    }).then(res => res.json())
    
    .catch((error) => console.log(error));
}

export async function getArduinoDataFecha(urlDB,data){
    return fetch(urlDB, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            mode: "no-cors",
        },
        body: data
    }).then(res => res.json())
    
    .catch((error) => console.log(error));
}