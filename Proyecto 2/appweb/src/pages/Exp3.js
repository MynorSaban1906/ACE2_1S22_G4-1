import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReLineChart from '../components/ReLineChart'
import { getArduinoDataFecha } from '../utils/utilsMongoDB'

export default function Exp3() {
  const [Data, setData] = useState([{}])
  const [Fecha, setFecha] = useState(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`)

  const getData = async () => {
    let arduinoData = await getArduinoDataFecha('http://localhost:5000/date',{"fecha":Fecha})
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
      <h1 className='text-center'>Fecha: {Fecha}</h1>
      <ReLineChart description="Cantidad de metano VS Temperatura" data={Data} XAxis="temperatura" lineName1="cantidad_gas" lineColor="#8884d8"/>
      <div className='text-center'>
        <div className="btn-group">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Filtar por fecha
          </button>
          <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={() => setFecha('1/2/2022')}>01/02/2022</a></li>
              <li><a className="dropdown-item" onClick={() => setFecha('2/2/2022')}>02/02/2022</a></li>
              <li><a className="dropdown-item" onClick={() => setFecha('3/2/2022')}>03/02/2022</a></li>
              <li><a className="dropdown-item" onClick={() => setFecha('4/2/2022')}>04/02/2022</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
