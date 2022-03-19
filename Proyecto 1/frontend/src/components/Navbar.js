import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container p-2">
            <a className="navbar-brand" href="/">Proyecto 1</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="mx-auto"></div>
            <div className="navbar-nav">
                <a className="nav-link" href="/Exp1">Suciedad vs Tiempo</a>
                <a className="nav-link" href="/Exp2">Humedad vs Tiempo</a>
                <a className="nav-link" href="/Exp3">Agua vs Tiempo</a>
                <a className="nav-link" href="/Exp4">Suciedad vs Tiempo (DF)</a>
                <a className="nav-link" href="/Exp5">Cantidad de agua</a>
            </div>
            </div>
        </div>
    </nav>
  )
}