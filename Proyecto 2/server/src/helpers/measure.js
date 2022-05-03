function dataFormat(metano, temperatura, bandera_tiempo, tiempo_uso) {
    let data = '{\n' +
        '"metano":' + metano + ',' +
        '\n"temperatura":' + temperatura + ',' +
        '\n"bandera_tiempo":' + bandera_tiempo + ',' +
        '\n"tiempo_uso":' + tiempo_uso + ','

    return data
}

module.exports = dataFormat;
