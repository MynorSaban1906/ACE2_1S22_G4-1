import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReLineChart from '../components/ReLineChart';
import { getArduinoData } from '../utils/utilsMongoDB';

export default function GraficaCO2() {
  
  const [Data, setData] = useState({})

  const getData = async () => {
    let arduinoData = await getArduinoData('http://localhost:5000/')
    setData(arduinoData)
  }

  useEffect(() =>{
    getData();
  },[]);

  return (
    <>
      <Navbar/>
      <ReLineChart description="Humedad (%) - CO2 (PPM) VS Tiempo (Fecha y hora)" data={Data} XAxis="fecha_hora" lineName1="humedad" lineName2="medicion_co2" />
    </>
  )
}
