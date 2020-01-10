import React, {Component} from "react"
import ContentHeader from "../../common/template/contentHeader";
import Content from "../../common/template/content";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import InfoBox from "../../common/template/infoBox";
import "../../common/template/custom.css"
import Button from "react-redux-toastr/lib/Button";
import ValueBox from "../../common/widget/valueBox";

class Retiradas extends Component {

    constructor(props) {
        super(props);
        this.state = {saldoDisponivel: "R$60,00", saldoBloqueado: "R$:0,00"}
    }

    render() {
        return (
            <div>
                <ContentHeader title="Solicitar Saque"/>
                <Content>
                    <Row>
                        <Grid cols="12 4">
                            <InfoBox iconColor="green" icon="money" text="valor">
                                <input className="retirada-input" type="number" min="1" step="any" placeholder="00,00"/>
                                <Button className="btn btn-success">Solicitar</Button>
                            </InfoBox>
                        </Grid>
                        <ValueBox cols="12 4" color="green" icon="usd"
                                  value="R$60,00" text="Saldo disponível"/>
                        <ValueBox cols="12 4" color="red" icon="ban"
                                  value="R$0,00" text="Saldo Bloqueado"/>
                    </Row>
                </Content>
            </div>
        )
    }
}

export default Retiradas;
