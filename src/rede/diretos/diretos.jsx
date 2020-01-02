import React, {Component} from "react";

import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";

export default class Diretos extends Component {
    constructor(props){
        super(props);
        this.state = {list: []};
    }

    componentWillMount(){
        const example = [{
            id: 1,
            nome: "Ronny Wisley",
            login: "ronny.wisley",
            data_cadastro: "22/11/2019",
            status: "ativo"
        }];
        this.setState({list: example})
    }

    renderRows(){
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

    render() {
        return (
            <div className="dataTables_wrapper">
                <ContentHeader title="Rede Diretos"/>
                <Content>
                    <table className="table">
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
                </Content>
            </div>
        )
    }

}