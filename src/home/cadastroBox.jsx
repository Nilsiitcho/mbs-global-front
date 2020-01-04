import React from "react";

import "../common/template/custom.css"
import Grid from "../common/layout/grid";
import InfoBox from "../common/template/infoBox";

function copy() {
    const copyText = document.getElementById("cadastro-field");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Link copiado: " + copyText.value);
}

function sendLink() {
    alert("implementar chamada de API do whatsapp");
}

export default props => (

    <Grid cols="12 6">
        <InfoBox iconColor="green" icon="star-o" text="Link de Cadastro">
            <input className="clipbord-box" type="text" value="https://mbsglobal.com.br/bo/cadastro/index/dyego"
                   readOnly id="cadastro-field"/>
            <button className="btn btn-default" onClick={copy}>Copiar</button>
            <br/>
            <a href="https://google.com.br" target="_blank" rel="noreferrer noopener"
               className="remove-margin btn btn-success"
               onClick={sendLink}><i className="fa fa-whatsapp"/></a>

            <a href="https://google.com.br" target="_blank" rel="noreferrer noopener"
               className="margin-left btn btn-github"
               onClick={sendLink}><i className="fa fa-user-plus"/></a>
        </InfoBox>
    </Grid>
)