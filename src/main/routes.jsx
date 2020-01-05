import React from "react";
import {Redirect, Route, Switch} from "react-router";

import Home from "../home/home";
import Suporte from "../suporte/suporte";
import Diretos from "../rede/diretos/diretos"
import Retiradas from "../financeiro/retiradas"
import MeusPedidos from "../loja/meusPedidos/meusPedidos";

export default props => (
    <div className="content-wrapper">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/loja/meusPedidos" component={MeusPedidos}/>
            <Route path="/rede/diretos" component={Diretos}/>
            <Route path="/financeiro/retiradas" component={Retiradas}/>
            <Route path="/suporte" component={Suporte}/>
            <Redirect from="*" to="/"/>
        </Switch>
    </div>
)