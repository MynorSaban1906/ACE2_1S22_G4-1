export async function getArduinoData(params) {
    return fetch('http://localhost:5002/stored', {
        method: 'GET',
        body: JSON.stringify(databody),
        headers: {
            'Content-Type': 'application/json',
            mode: "no-cors",
        },
    }).then(res => res.json())
    .then(async function (response) {
        if (response.status === 200) {
            let respuesta = await response.json();
            console.log(respuesta);
        } else {
            alert('algo anda mal');
        }
    })
    .catch((error) => console.log(error));
}