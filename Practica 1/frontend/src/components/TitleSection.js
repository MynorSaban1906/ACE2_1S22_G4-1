import React from 'react'
import '../styles/TitleSectionStyles.css'

export default function TitleSection() {
  return (
    <div className="container-fluid banner-image w-100 vh-100 d-flex justify-content-center align-items-center" id="home">
        <div className="row content text-center">
            <div className="col-md-12">
                <p className="text-white nameTitle">Arquitectura de Computadores y Ensambladores 2</p>
                <p className="text-white description">
                    Práctica 1
                </p>
            </div>                    
        </div>
    </div>
  )
}
