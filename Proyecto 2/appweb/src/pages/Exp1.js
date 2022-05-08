import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReLineChart from '../components/ReLineChart'
import { getArduinoDataFecha } from '../utils/utilsMongoDB'

export default function Exp1() {

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
      <ReLineChart description="Cantidad de metano VS Tiempo" data={Data} XAxis="hora" lineName1="cantidad_gas" lineColor="#8884d8"/>
      <div className='text-center'>
        <div className="btn-group">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Filtar por fecha
          </button>
          <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={() => setFecha('4/5/2022')}>04/05/2022</a></li>
              <li><a className="dropdown-item" onClick={() => setFecha('5/5/2022')}>05/05/2022</a></li>
              <li><a className="dropdown-item" onClick={() => setFecha('6/5/2022')}>06/05/2022</a></li>
              <li><a className="dropdown-item" onClick={() => setFecha('7/5/2022')}>07/05/2022</a></li>
              <li><a className="dropdown-item" onClick={() => setFecha('8/5/2022')}>08/05/2022</a></li> 
          </ul>
        </div>
      </div>
    </>
  )
}
