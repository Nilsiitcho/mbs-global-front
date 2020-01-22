import React from "react";

import Grid from "../../common/layout/grid";

export default props => (
    <Grid cols='12 3'>
        <div className="produto-container">
            <h4 className="produto-header">{props.title}</h4>
            <img src={props.src} className="produto-image" alt="imagem do produto"/>
            <div className="produto-decsricao">
                <strong>{`Valor: ${props.valor}`}</strong>
                <br/>
                <strong>{`Bônus de rede: ${props.bonus}`}</strong>
            </div>
            <button className="btn btn-primary" onClick={props.onClick}><i className={'fa fa-shopping-cart'}/> Comprar
            </button>
        </div>
    </Grid>
)