import React from 'react'
import '../styles/ExperimentsDesStyles.css'

export default function ExperimentsDes() {
  return (
    <div className="container" id="qualities">
        <div className="row text-center infoPadding">
            <div className="col-md-3 d-flex justify-content-center align-items-center">
                <div className="info-card border">
                    <a href="/Experimento1" className='fill-div'>
                        <span style={{fontSize: 40, color: "#228c99"}}>
                            <i class="fas fa-flask mb-4"></i>
                        </span>
                        <h5>Experimento 1</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2">Con la temperatura exterior e interior se realizará la comparación dos gráficas superpuestas para determinar si el prototipo realiza la función de un aire acondicionado utilizando energía renovable. <br /><br /></p>
                    </a>
                </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center">
                <div className="info-card border">
                    <a href="/Experimento2" className='fill-div'>
                        <span style={{fontSize: 40, color: "#228c99"}}>
                        <i class="fas fa-vial mb-4"></i>
                        </span>
                        <h5>Experimento 2</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2">Se compará si la temperatura cambia al aumentar la humedad de la tierra. Se realiza la comparación de dos gráficas superpuestas para determinar sí el aumento en la humedad impacta en la temperatura Interior.</p>
                    </a>
                </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center">
                <div className="info-card border">
                    <a href="/Experimento3" className='fill-div'>
                        <span style={{fontSize: 40, color: "#228c99"}}>
                        <i class="fas fa-vials mb-4"></i>
                        </span>
                        <h5>Experimento 3</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2">Comparará si la temperatura cambia al estar soleado o nublado utilizando un sensor capaz de determinar la luz solar en el ambiente. <br /><br /><br /><br /> <br /></p>
                    </a>
                </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center">
                <div className="info-card border">
                    <a href="/GraficaCO2" className='fill-div'>
                        <span style={{fontSize: 40, color: "#228c99"}}>
                            <i class="fas fa-chart-line mb-4"></i>
                        </span>
                        <h5>Gráfica CO2</h5>
                        <hr className="line"></hr>
                        <p className="text-color-2">Se realizará un grafico con los valores de la humedad y CO2 para medir si dentro de nuestras viviendas(prototipo) mantenemos un ambiente saludable. <br /><br /><br /><br /></p>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}
