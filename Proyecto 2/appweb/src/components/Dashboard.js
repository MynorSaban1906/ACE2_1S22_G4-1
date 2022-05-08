import React, { useEffect, useState } from 'react'
import { getArduinoData } from '../utils/utilsMongoDB';
import '../styles/DashboardStyle.css'
import GasTank from './GasTank';
import ThermometerIcon from './ThermometerIcon';

export default function Dashboard() {

    const [Data, setData] = useState({})

    const getData = async () => {
        let arduinoData = await getArduinoData('http://localhost:5000/lastRecord')
        setData(arduinoData)
    }
  
    useEffect(() =>{
         getData();
       },[]);

    
    useEffect(() => {
        var handle = setInterval(getData, 3000)

        return () => {
        clearInterval(handle)
        }
    })

    console.log(Data);

    return (
        <div className="container" id="qualities">
            <div className="row text-center infoPadding justify-content-center align-items-center">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <GasTank cantidadMetano={Data.cantidad_gas}/>
                        <h5 className='mt-3'>Cantidad de metano (Tanque)</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2 fs-3">{Data.cantidad_gas}</p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <ThermometerIcon temperatura={Data.temperatura}/>
                        <h5 className='mt-4'>Temperatura dentro del tanque</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2 fs-3">{Data.temperatura}°C</p>
                    </div>
                </div>
            </div>
        </div>
    )
}