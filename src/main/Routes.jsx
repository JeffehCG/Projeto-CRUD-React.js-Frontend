//Arquivo que ira Mapear as URLs, e direcionar para pagina certa
import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'

export default props =>
    <Switch>{/*Switch - onde se coloca todas rotas*/}
        <Route exact path='/' component = {Home}></Route> {/* Sempre que o usuario viajar para "/" Sera redirecionado para pagina Home / exact = (Exatamente a URL "/"")*/}
        <Route path='/users' component = {UserCrud}></Route> {/* Nessa caso como esta sem o exact, se a url for /users2, ira navegar, pois contem /users */}
        <Redirect from = '*' to = "/"></Redirect> {/* Qualquer outra URL sera redirecionada para Home "/" */}
    </Switch>