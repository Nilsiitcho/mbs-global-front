import React, {Component} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import List from "../../common/template/lista";
import Pages from "../../common/template/paginacao";
import Row from "../../common/layout/row";
import Grid from "../../common/layout/grid";
import InfoBox from "../../common/widget/infoBox"

export default class HistoricoRetiradas extends Component {
    constructor(props) {
        super(props);
        this.state = {ganhosDia: "R$60,00", ganhosSemana: "R$30.00", ganhosMes: "R$100,00", totalGanhos: "R$190,00"}
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

    formatDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    getToday() {
        return this.formatDate(new Date());
    }

    getFirstDayOfMonth() {
        const date = new Date(new Date().setDate(1));
        return this.formatDate(date)
    }

    render() {
        return (
            <div>
                <ContentHeader title="Histórico de Pagamentos"/>
                <Content>
                    <hr/>
                    <Row>
                        <Grid cols="12 3">
                            <label htmlFor="input-inicio">De </label>
                            <input id="input-inicio" className="historico-input" type="date"/>
                        </Grid>
                        <Grid cols="12 3">
                            <label htmlFor="input-fim">Até</label>
                            <input id="input-fim" className="historico-input" type="date"/>
                        </Grid>
                        <Grid cols="12 3">
                            <label htmlFor="tipo">Tipo</label>
                            <select id="tipo" className="historico-input">
                                <option value="GERAL">Geral</option>
                                <option value="GANHOS">Ganhos</option>
                                <option value="SAQUES">Saques</option>
                            </select>
                        </Grid>
                        <Grid cols="12 3">
                            <button className="btn btn-success">Filtrar</button>
                        </Grid>
                    </Row>
                    <hr/>
                    <Row>
                        <Grid cols="12">
                            <List cols={["ID", "DATA", "PAGAMENTO EM", "usuário", "REFERENTE", "VALOR"]}
                                  items={this.state.list}/>
                            <Pages totalDePaginas={this.state.totalDePaginas} paginaAtual={this.state.paginaAtual}
                                   callBack={function (data) {
                                       this.getPage(data)
                                   }.bind(this)}/>
                        </Grid>
                    </Row>
                    <hr/>

                    <Row>
                        <InfoBox cols="12 3" type="primary" header="GANHOS DO DIA" footer={this.getToday()}>
                            <strong>{this.state.ganhosDia}</strong>
                        </InfoBox>
                        <InfoBox cols="12 3" type="info" header="GANHOS DA SEMANA" footer="11/10/2020">
                            <strong>{this.state.ganhosSemana}</strong>
                        </InfoBox>
                        <InfoBox cols="12 3" type="warning" header="GANHOS DO MÊS"
                                 footer={`De ${this.getFirstDayOfMonth()} até ${this.getToday()}`}>
                            <strong>{this.state.ganhosMes}</strong>
                        </InfoBox>
                        <InfoBox cols="12 3" type="success" header="TOTAL DE GANHOS" footer={`Até ${this.getToday()}`}>
                            <strong>{this.state.totalGanhos}</strong>
                        </InfoBox>
                    </Row>
                </Content>
            </div>
        )
    }
}
