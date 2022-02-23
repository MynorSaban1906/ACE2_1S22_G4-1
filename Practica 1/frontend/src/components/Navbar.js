import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container p-2">
            <a className="navbar-brand" href="/">Practica 1</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="mx-auto"></div>
            <div className="navbar-nav">
                <a className="nav-link" href="/Experimento1">Experimento 1</a>
                <a className="nav-link" href="/Experimento2">Experimento 2</a>
                <a className="nav-link" href="/Experimento3">Experimento 3</a>
                <a className="nav-link" href="/GraficaCO2">Gráfica CO2</a>
            </div>
            </div>
        </div>
    </nav>
  )
}
