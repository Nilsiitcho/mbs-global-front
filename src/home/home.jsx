import React, {Component} from "react";

import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import ValueBox from "../common/widget/valueBox";
import Row from "../common/layout/row";
import CadastroBox from "./cadastroBox.jsx"

export default class Home extends Component {

    formatDate() {
        const today = new Date();
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    }

    render() {
        return (
            <div>
                <ContentHeader title="Home" small="Versão 0.0.1"/>
                <Content>
                    <Row>
                        <ValueBox cols="12 4" color="green" icon="usd"
                                  value="R$60,00" text="Saldo disponível"
                                  small={`Último ganho em ${this.formatDate()}`}/>
                        <ValueBox cols="12 4" color="orange" icon="connectdevelop"
                                  value="R$60,00" text="Bonus Infinity "
                                  small={`Último ganho em ${this.formatDate()}`}/>
                        <ValueBox cols="12 4" color="red" icon="ban"
                                  value="R$0,00" text="Saldo Bloqueado" small={`Último ganho em ${this.formatDate()}`}/>
                    </Row>

                    <Row>
                        <ValueBox cols="12 4" color="red" icon="user"
                                  value="Inativo" text="Próxima ativação em 21/12"/>
                        <ValueBox cols="12 4" color="green" icon="users"
                                  value="0" text="Diretos "/>
                        <ValueBox cols="12 4" color="blue" icon="shopping-cart"
                                  value="0" text="Pedidos"/>
                    </Row>

                    <Row>
                        <CadastroBox/>
                    </Row>

                </Content>
            </div>
        )
    }

}