import React, {Component} from "react";
import axios from "axios";

import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import List from "../../common/template/lista";
import Pages from "../../common/template/paginacao";

export default class Diretos extends Component {
    constructor(props) {
        super(props);
        this.state = {list: [], paginaAtual: 1};
    }

    async componentWillMount() {
        await this.getData("http://localhost:8080/api/diretos");
    }

    async getData(url) {
        const payload = await axios.get(url);
        const {data, pages, lastPage, nextPage, total, actualPage} = payload.data;
        this.setState({list: data, total, pages, lastPage, nextPage, actualPage});
    }

    async getPage(page) {
        await this.getData(`http://localhost:8080/api/diretos?page=${page}`);
    }

    render() {
        return (
            <div>
                <ContentHeader title="Rede Diretos"/>
                <Content>
                    <List cols={["ID", "NOME", "LOGIN", "DATA CADASTRO", "STATUS"]} items={this.state.list}/>
                    <Pages totalDePaginas={this.state.pages} paginaAtual={this.state.actualPage}
                           nextPage={this.state.nextPage} lastPage={this.state.lastPage}
                           callBack={async function (data) {
                               this.getPage(data)
                           }.bind(this)}/>
                </Content>
            </div>
        )
    }
}
