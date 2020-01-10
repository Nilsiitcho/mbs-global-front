import React, {Component} from "react";

import "../../common/template/custom.css";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import List from "../../common/template/lista";

export default class MeusPedidos extends Component {
    constructor(props) {
        super(props);
        this.state = {list: [], paginaAtual: 1};
    }

    componentWillMount() {
        const pedidos = [{
            id: 1,
            data: "28/10/2019",
            valor: "R$ 320,00",
            status: "Cancelado"
        }, {
            id: 2,
            data: "05/01/2020",
            valor: "R$ 1800,00",
            status: "Finalizado"
        }];

        const total = pedidos.length;
        const totalDePaginas = 2;
        const paginaAnterior = null;
        const proximaPagina = "";
        const paginaAtual = 1;

        pedidos.forEach(pedido => (
            pedido.acao = <button className="btn btn-success" onClick={() => this.visualizarPedido(pedido)}>Visualizar
            </button>
        ));

        this.setState({list: pedidos, total, totalDePaginas, paginaAtual, paginaAnterior, proximaPagina})
    }

    visualizarPedido(pedido) {
        alert(`${pedido.id} - ${pedido.valor}`)
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
        this.setState({...this.state, paginaAtual: page, proximaPagina, paginaAnterior});
    }

    render() {
        return (
            <div>
                <ContentHeader title="Rede Diretos"/>
                <Content>
                    <List cols={["ID", "DATA", "VALOR", "STATUS", "AÇÃO"]} items={this.state.list}/>
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
