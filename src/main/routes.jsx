import React from "react";
import {Redirect, Route, Switch} from "react-router";

import Home from "../home/home";
import Suporte from "../suporte/suporte";
import Diretos from "../rede/diretos/diretos"
import Retiradas from "../financeiro/retiradas"

export default props => (
    <div className="content-wrapper">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/suporte" component={Suporte}/>
            <Route path="/rede/diretos" component={Diretos}/>
            <Route path="/financeiro/retiradas" component={Retiradas} />
            <Redirect from="*" to="/"/>
        </Switch>
    </div>
)