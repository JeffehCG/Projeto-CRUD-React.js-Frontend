//Pagina do CRUD dos usuarios
import React, {Component} from 'react'
import Axios from 'axios'
import Main from '../template/Main'


//Propriedades do Cabeçalho
const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users' //URL do servidor backend
//Estado inicial do componente 
const initialState = {
    user: {name: '', email: ''},
    list: [],
}

export default class UserCrud extends Component {

    //Estado do componente
    state = {...initialState}

    //Função para atualizar a lista de usuarios
    componentWillMount() { //Essa função é chamada apenas quando o componente for exibido na tela 
        Axios(baseUrl) //Axios sem method é por padrão requisição get (ou seja, a resposta sera os dados do arquivo db.json)
            .then(resp => {
                this.setState({list: resp.data}) // Atualizando lista (resp.data = dados do arquivo db.json)
            })
    }

    //Função para limpar o formulario
    clear() {
        this.setState({user:initialState.user})
    }

    //Função para incluir e alterar usuario no db.json apartir do state
    save(){
        const user = this.state.user //pegando o usuario
        const method = user.id ? 'put' : 'post' // se o id do usuario estiver presente sera metodo put (para alterar) se não sera post( para incluir)
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl //Se o id estiver presente, a url sera a base mais o id
        
        //Requisição Ajax
        //Enviando a requisição para o backend, mandando o metodo de requisição, a url e os dados a serem incluidos
        //Ps... enviando esses dados para o backend o json-server gerencia automaticamente os dados, e salva os dados no db.json
        Axios[method](url, user)
            .then(resp => {
                const list = this.getUpdadeList(resp.data) //Atualizando a lista de usuarios (resp.data - usuario que foi cadastrado ou alterado)
                this.setState({user: initialState.user, list:list}) //Limpando formulario
            })
    }

    //Metodo para atualizar a lista quando um usuario for cadastrado/alterado ou excluido
    getUpdadeList(user, add = true){ //add identifica se sera adicionado outro usuario na lisa(cadastro/alteração) ou não (exclusão)
        const list = this.state.list.filter(u => u.id !== user.id) //Removendo usuario alterado da lista (removendo os dados desatualizados)
        if (add) list.unshift(user) // Recolocar o usario na primeira posição do array (os dados atualizados)
        return list //retornando a lista atualizada
    }

    //Função para atualizar o state apartir dos dados colocados no formulario
    updateField(event){
        const user ={...this.state.user} //Clonando objeto usuario
        user[event.target.name] = event.target.value //[event.target.name] = pegando o nome do input do elemento que disparou o evento / event.target.value = pegando o valor do elemento , ou seja (user.[nomeInput] = valor do elemento)
        this.setState({user:user})
    }

    //Função para renderizar formulario
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6"> {/* dispositivo pequeno ocupa 12 colunas, medio pra cima ocupa 6 */}
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)} /*Quando campo for alterado, chama a função que altera o atributo do state referente ao input (nesse caso o name) */  
                                placeholder = "Digite o nome..."/> 
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail:</label>
                            <input type="text" className="form-control" 
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder = "Digite o email..."/> 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                       <button className="btn btn-primary"
                            onClick={e => this.save(e)}> {/* Quando clicar salvar ou alterar usuario */}
                            Salvar
                       </button> 
                       <button className="btn btn-secondary.ml-2"
                            onClick={e => this.clear(e)}> {/* Quando clicar limpar o formulario */}
                            Cancelar
                       </button>
                    </div>
                </div>
            </div>
        )
    }

    //Função para atualizar o status
    //(Quando selecionar alterar na tabela, os campos do form seram preenchidos com os dados do usuario, como sera passado o id junto, a função save() identificara que é uma alteração)
    load(user) {
        this.setState({user})
    }

    //Função para remover usuario
    remove(user) {
        Axios.delete(`${baseUrl}/${user.id}`) //Enviando requisição delete para o backend, (lembrando que recebendo a requisição o json-server gerencia automaticamente)
            .then(resp => {
                const list = this.getUpdadeList(user,false)
                this.setState({list:list})
            })
    }

    //Função para renderizar a tabela
    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    //Função para renderizar linhas da tabela
    renderRows(){
        return this.state.list.map(user => { //mapeando a lista para pegar os atributos
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={()=> this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    //Renderizar a tela
    render(){
        return(
            <Main {...headerProps}> {/* Passando as propriedades pro Main, que ira passar para o Header */}
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}