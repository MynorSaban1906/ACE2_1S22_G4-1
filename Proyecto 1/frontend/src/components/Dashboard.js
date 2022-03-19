import React, { useEffect, useState } from 'react'
import { getArduinoData } from '../utils/utilsMongoDB';
import '../styles/DashboardStyle.css'
import BucketIcon from './BucketIcon'
import HumidityIcon from './HumidityIcon'

export default function Dashboard() {

    const [Data, setData] = useState({})

    const getData = async () => {
        let arduinoData = await getArduinoData('http://localhost:5000/ultimoDato')
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
            <div className="row text-center infoPadding">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <span style={{fontSize: 40, color: Data.suciedadInicial == 1 ? '#2FA4FF' : '#534340'}}>
                            <i className="fa-solid fa-droplet mb-4"></i>
                        </span>
                        <h5>Suciedad de Agua (Casa)</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2 fs-3">{Data.suciedadInicial}</p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <HumidityIcon humedad={Data.humedadSuelo}/>
                        <h5 className='mt-4'>Humedad en el suelo del jardín</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2 fs-3">{Data.humedadSuelo}%</p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <span style={{fontSize: 40, color: Data.suciedadFinal == 1 ? '#2FA4FF' : '#534340'}}>
                            <i className="fa-solid fa-droplet mb-4"></i>
                        </span>
                        <h5>Suciedad de Agua (Filtrado)</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2 fs-3">{Data.suciedadFinal}</p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <a href="/GraficaCO2" className='fill-div'>
                            <BucketIcon bucket={300}/>
                            <h5 className='mt-4'>Cantidad de agua almacenada</h5>
                            <hr className="line"></hr>
                            <p className="text-color-2 fs-3">{Data.aguaFiltrada}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
