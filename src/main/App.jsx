//Arquivo principal, que esta impostando todas paginas do sistema
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import {HashRouter} from 'react-router-dom'
//ou
//import {BrowserRouter} from 'react-router-dom' Porem é recomendado utilizar o componente de cima

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'

export default props =>
    /* Componente de router responsavel por fazer a navegação das paginas atraves da URL */
    <HashRouter>
        <div className='app'>
            <Logo></Logo>
            <Nav></Nav>
            <Routes></Routes> {/* Arquivo que expecifica a url das rotas que seram percoridas (Home, UserCrud) */}
            <Footer></Footer>
        </div>
    </HashRouter>
