import "../common/template/custom.css"
import React from "react";
import Grid from "../common/layout/grid";

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
        <div className="info-box">
            <span className="info-box-icon bg-green"><i className="fa fa-star-o"/></span>
            <div className="info-box-content">
                <span className="info-box-text">Link de cadastro</span>
                <input className="clipbord-box" type="text" value="https://mbsglobal.com.br/bo/cadastro/index/dyego"
                       id="cadastro-field"/>
                <button className="btn btn-default" onClick={copy}>Copiar</button>
                <br/>
                <a href="https://google.com.br" target="_blank" rel="noreferrer noopener"
                   className="remove-margin btn btn-success"
                   onClick={sendLink}><i className="fa fa-whatsapp"/></a>

                <a href="https://google.com.br" target="_blank" rel="noreferrer noopener"
                   className="margin-left btn btn-github"
                   onClick={sendLink}><i className="fa fa-user-plus"/></a>
            </div>
        </div>
    </Grid>
)