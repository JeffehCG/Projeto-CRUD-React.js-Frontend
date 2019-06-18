import './Nav.css'
//Menu de navegação
import Iten from './NavIten'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Iten link = "/" design = "fa fa-home" option = "Início"></Iten>
            <Iten link = "/users" design = "fa fa-users" option = "Usuários"></Iten>
        </nav>
    </aside>