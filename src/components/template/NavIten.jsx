//Itens do menu de navegação
import React from 'react'
import {Link} from 'react-router-dom' // Link = Componente que coloca o Hash "#"

export default props =>
    <Link to={props.link}>
        <i className = {props.design}>{props.option}</i>
    </Link>