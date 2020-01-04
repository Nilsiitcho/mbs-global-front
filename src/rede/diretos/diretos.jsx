import React, {Component} from "react";

import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";

export default class Diretos extends Component {
    constructor(props) {
        super(props);
        this.state = {list: [], paginaAtual: 1};
    }

    componentWillMount() {
        const example = [{
            id: 1,
            nome: "Ronny Wisley",
            login: "ronny.wisley",
            data_cadastro: "22/11/2019",
            status: "ativo"
        }, {
            id: 2,
            nome: "Martília Mendonça",
            login: "marilinha",
            data_cadastro: "02/01/2020",
            status: "inativo"
        }, {
            id: 3,
            nome: "Xereleu",
            login: "xexeu",
            data_cadastro: "02/01/2000",
            status: "ativo"
        }, {
            id: 4,
            nome: "Bisinota",
            login: "bisusinha",
            data_cadastro: "12/08/2017",
            status: "inativo"
        }];

        const total = example.length;
        const totalDePaginas = 2;
        const paginaAnterior = null;
        const proximaPagina = "";
        const paginaAtual = 1;

        this.setState({list: example, total, totalDePaginas, paginaAtual, paginaAnterior, proximaPagina})
    }

    renderRows() {
        const list = this.state.list || [];
        return list.map(user => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.login}</td>
                <td>{user.data_cadastro}</td>
                <td>{user.status}</td>
            </tr>
        ))
    }

    renderPages() {
        const pages = [];

        for (let i = 1; i <= this.state.totalDePaginas; i++) {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            const page = <li className={`page-item ${this.state.paginaAtual === i ? "active" : ""}`}><a
                className="page-link" onClick={() => this.getPageData(i)}>{i}</a></li>;
            pages.push(page);
        }

        return pages;
    }

    getPageData(page){
        const proximaPagina = "";
        const paginaAnterior = "";
        console.log(`Pegando dados da página ${page}`);
        this.setState({...this.state, paginaAtual: page, proximaPagina, paginaAnterior});
    }

    render() {
        return (
            <div>
                <ContentHeader title="Rede Diretos"/>
                <Content>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>LOGIN</th>
                            <th>DATA CADASTRO</th>
                            <th>STATUS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderRows()}
                        </tbody>
                    </table>
                    <ul className="pagination ">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <li className="page-item"><a className="page-link" >Previous</a></li>
                        {this.renderPages()}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <li className="page-item"><a className="page-link" >Next</a></li>
                    </ul>
                </Content>
            </div>
        )
    }
}