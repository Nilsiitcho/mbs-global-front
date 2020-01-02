import React from "react";

import Row from "../common/layout/row"
import Grid from "../common/layout/grid";
import InfoBox from "../common/template/infoBox";
import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content"

export default props => (
    <div>
        <ContentHeader title="Suporte"/>
        <Content>
            <Row>
                <Grid cols="12 4">
                    <InfoBox iconColor="green" icon="whatsapp" text="Whatsapp">
                        <span className="info-box-number">(63) 9 9976-2296</span>
                    </InfoBox>
                </Grid>
            </Row>
            <Row>
                <Grid cols="12 4">
                    <InfoBox iconColor="blue" icon="phone" text="Telefone">
                        <span className="info-box-number">(63) 3322-2286</span>
                    </InfoBox>
                </Grid>
            </Row>
        </Content>
    </div>
)