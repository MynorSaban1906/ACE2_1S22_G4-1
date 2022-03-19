import React, { useEffect, useState } from 'react'
import { getArduinoData } from '../utils/utilsMongoDB';
import '../styles/DashboardStyle.css'
import BucketIcon from './BucketIcon'
import HumidityIcon from './HumidityIcon'

export default function Dashboard() {

    const [Data, setData] = useState({})
    const [waterColor1, setWaterColor1] = useState('#2FA4FF')
    const [waterColor2, setWaterColor2] = useState('#2FA4FF')
    const [humedad, setHumedad] = useState('1000')
    const [bucket, setBucket] = useState('1000')

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
                        <a href="/Experimento1" className='fill-div'>
                            <span style={{fontSize: 40, color: waterColor1}}>
                                <i class="fa-solid fa-droplet mb-4"></i>
                            </span>
                            <h5>Suciedad de Agua (Casa)</h5>
                            <hr className="line"></hr>
                            <p className="text-color-2 fs-3">{Data.suciedadInicial}</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <a href="/Experimento2" className='fill-div'>
                            <HumidityIcon humedad={100}/>
                            <h5 className='mt-4'>Humedad en el suelo del jardín</h5>
                            <hr className="line"></hr>
                            <p className="text-color-2 fs-3">{Data.humedadSuelo}</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <a href="/Experimento3" className='fill-div'>
                            <span style={{fontSize: 40, color: waterColor2}}>
                                <i class="fa-solid fa-droplet mb-4"></i>
                            </span>
                            <h5>Suciedad de Agua (Filtrado)</h5>
                            <hr className="line"></hr>
                            <p className="text-color-2 fs-3">{Data.suciedadFinal}</p>
                        </a>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className="info-card border">
                        <a href="/GraficaCO2" className='fill-div'>
                            <BucketIcon bucket={bucket}/>
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
