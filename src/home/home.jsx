import React, {Component} from "react";

import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import ValueBox from "../common/widget/valueBox";
import Row from "../common/layout/row";

export default class Home extends Component {

    render() {
        return (
            <div>
                <ContentHeader title="Home" small="Versão 0.0.1"/>
                <Content>
                    <Row>
                        <ValueBox cols="12 4" color="green" icon="bank"
                                  value="R$60,00" text="Saldo disponível"/>
                        <ValueBox cols="12 4" color="orange" icon="bank"
                                  value="R$60,00" text="Bonus Infinity "/>
                        <ValueBox cols="12 4" color="red" icon="bank"
                                  value="R$0,00" text="Saldo Bloqueado"/>
                    </Row>

                    <Row>
                        <ValueBox cols="12 4" color="red" icon="bank"
                                  value="Inativo" text="Próxima ativação em 21/12"/>
                        <ValueBox cols="12 4" color="green" icon="bank"
                                  value="0" text="Direitos "/>
                        <ValueBox cols="12 4" color="green" icon="bank"
                                  value="0" text="Pedidos"/>
                    </Row>
                </Content>
            </div>
        )
    }

}