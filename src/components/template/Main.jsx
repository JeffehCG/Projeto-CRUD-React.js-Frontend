//Modelo generico das paginas do sistema como (Home.jsx e UserCrud.jsx)
import './Main.css'
import React from 'react'
import Header from './Header'

export default props => 
    <React.Fragment>
        <Header {...props}></Header> {/* Colocando o Header diretamente aqui, pois ele ira mudar dependendo do componente que esta sendo acessado {...props} - passando as propriedades de App.jsx para o Header*/}
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children} {}
            </div>
        </main>
    </React.Fragment>