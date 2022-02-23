import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ReLineChart from '../components/ReLineChart';
import { getArduinoData } from '../utils/utilsMongoDB';

export default function Experimento1() {

  const [Data, setData] = useState({})

  const getData = () => {
    let arduinoData = getArduinoData('URL')
    setData(arduinoData)
  }

  useEffect(() =>{
    getData();
  },[]);


  return (
    <>
      <Navbar/>
      <ReLineChart description="Temperatura (°C) VS Tiempo (Fecha y hora)" data={Data} XAxis="fecha_hora" lineName1="Temperatura Interna" lineName2="Temperatura Externa" />
    </>
    
  )
}
