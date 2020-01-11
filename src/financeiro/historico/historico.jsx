import React, {Component} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import List from "../../common/template/lista";
import Pages from "../../common/template/paginacao"

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

    getPage(page) {
        this.setState({...this.state, paginaAtual: page});
    }

    render() {
        return (
            <div>
                <ContentHeader title="Histórico de Pagamentos"/>
                <Content>
                    <List cols={["ID", "DATA", "PAGAMENTO EM", "usuário", "REFERENTE", "VALOR"]}
                          items={this.state.list}/>
                    <Pages totalDePaginas={this.state.totalDePaginas} paginaAtual={this.state.paginaAtual}
                           callBack={function (data) {
                               this.getPage(data)
                           }.bind(this)}/>
                </Content>
            </div>
        )
    }
}
