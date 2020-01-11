import React, {Component} from "react";

import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import List from "../../common/template/lista";
import Pages from "../../common/template/paginacao";

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
                <ContentHeader title="Rede Diretos"/>
                <Content>
                    <List cols={["ID", "NOME", "LOGIN", "DATA CADASTRO", "STATUS"]} items={this.state.list}/>
                    <Pages totalDePaginas={this.state.totalDePaginas} paginaAtual={this.state.paginaAtual}
                           callBack={function (data) {
                               this.getPage(data)
                           }.bind(this)}/>
                </Content>
            </div>
        )
    }
}
