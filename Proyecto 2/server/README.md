## Contenido
- [Estructura del objeto en Mongo](#estructura-del-objeto-en-mongo)
- [Endpoints](#endpoints)
  - [Nuevo registro](#nuevo-registro)
  - [Obtener todas los registros](#obtener-todas-los-registros)
  - [Obtener último registro](#obtener-último-registro)
  - [Filtrar por fecha](#filtrar-por-fecha)

# Estructura del objeto en Mongo

```js
{
    "metano": 0,
    "temperatura": 0,
    "bandera_tiempo": 0,
    "tiempo_uso": 0,
    "fecha": "22 Feb 2022",
    "hora": "10:30:27",
}
```
# Endpoints

## Nuevo registro

**POST http://localhost:5000/**

```js
{
    "metano": 0,
    "temperatura": 0,
    "bandera_tiempo": 0,
    "tiempo_uso": 0
}
```

## Obtener todas los registros

**GET http://localhost:5000/allData**

## Obtener último registro

**GET http://localhost:5000/lastRecord**

## Filtrar por fecha

**POST http://localhost:5000/date**

```js
{
    "fecha": "27/4/2022"
}
```