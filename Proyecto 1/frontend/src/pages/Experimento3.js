import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReLineChart from '../components/ReLineChart'
import { getArduinoData } from '../utils/utilsMongoDB'

export default function Experimento3() {

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
      <ReLineChart description="Cantidad de agua VS Tiempo" data={Data} XAxis="fechaHora" lineName1="aguaFiltrada" lineColor="#FFC300"/>
    </>
  )
}
