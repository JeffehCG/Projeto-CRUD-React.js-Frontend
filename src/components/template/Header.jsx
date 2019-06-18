//Cabeçalho
import './Header.css'
import React from 'react'

export default props => //props - passado de App.jsx para Main.jsx para Header.jsx
    <header className="header d-none d-sm-flex flex-column"> {/* sm - dispositivos pequenos pra cima, ou seja, não vai aparecer para celular */}
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>