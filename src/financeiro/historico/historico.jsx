import React, {Component} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";

export default class HistoricoRetiradas extends Component {
    constructor(props) {
        super(props);
        this.state = {ganhosDia: "R$60,00", ganhosSemana: "R$30.00", ganhosMes: "R$:100,00", totalGanhos: "R$190,00"}
    }

    componentWillMount() {
        const example = [{
            id: 1,
            data: "28/10/2019",
            pagamento: "Pagamento Efetuado",
            usuario: "dyego",
            referente: "Extorno",
            valor: "R$ 320,00",
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
        return list.map(pedido => (
            <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.data}</td>
                <td>{pedido.pagamento}</td>
                <td>{pedido.usuario}</td>
                <td>{pedido.referente}</td>
                <td>{pedido.valor}</td>
            </tr>
        ))
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
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATA</th>
                            <th>PAGAMENTO EM</th>
                            <th>USUÁRIO</th>
                            <th>REFERENTE</th>
                            <th>VALOR</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderRows()}
                        </tbody>
                    </table>
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
