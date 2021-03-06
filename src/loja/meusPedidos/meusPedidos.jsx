import React, {Component} from "react";

import "../../common/template/custom.css";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import List from "../../common/template/lista";
import Pages from "../../common/template/paginacao";

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

    getPage(page) {
        this.setState({...this.state, paginaAtual: page});
    }

    render() {
        return (
            <div>
                <ContentHeader title="Meus Pedidos"/>
                <Content>
                    <List cols={["ID", "DATA", "VALOR", "STATUS", "AÇÃO"]} items={this.state.list}/>
                    <Pages totalDePaginas={this.state.totalDePaginas} paginaAtual={this.state.paginaAtual}
                           callBack={function (data) {
                               this.getPage(data)
                           }.bind(this)}/>
                </Content>
            </div>
        )
    }
}
