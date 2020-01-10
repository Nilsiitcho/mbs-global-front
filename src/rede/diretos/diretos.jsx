import React, {Component} from "react";

import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import List from "../../common/template/lista";

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
        }];

        const total = example.length;
        const totalDePaginas = 2;
        const paginaAnterior = null;
        const proximaPagina = "";
        const paginaAtual = 1;

        this.setState({list: example, total, totalDePaginas, paginaAtual, paginaAnterior, proximaPagina})
    }

    renderPages() {
        const pages = [];
        for (let i = 1; i <= this.state.totalDePaginas; i++) {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            const page = <li className={`page-item ${this.state.paginaAtual === i ? "active active-custom" : ""}`}><a
                className="page-link" onClick={() => this.getPageData(i)}>{i}</a></li>;
            pages.push(page);
        }
        return pages;
    }

    getPageData(page) {
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
                    <List cols={["ID", "NOME", "LOGIN", "DATA CADASTRO", "STATUS"]} items={this.state.list}/>
                    <ul className="pagination ">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <li className="page-item"><a className="page-link">Anterior</a></li>
                        {this.renderPages()}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <li className="page-item"><a className="page-link">Próximo</a></li>
                    </ul>
                </Content>
            </div>
        )
    }
}
