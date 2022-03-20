import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReLineChart from '../components/ReLineChart'
import { getArduinoData } from '../utils/utilsMongoDB'

export default function Experimento1() {
  
  const [Data, setData] = useState([{}])

  const getData = async () => {
    let arduinoData = await getArduinoData('http://localhost:5000/')
    setData(arduinoData)
  }

  useEffect(() =>{
    getData();
  },[]);

  useEffect(() =>{
    var handle = setInterval(getData, 3000)

    return () => {
      clearInterval(handle)
    }
  });

  return (
    <>
      <Navbar/>
      <ReLineChart description="Cantidad de suciedad VS Tiempo" data={Data} XAxis="fechaHora" lineName1="suciedadInicial" lineColor="#8884d8"/>
    </>
    
  )
}
