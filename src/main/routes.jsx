import React from "react";
import {Redirect, Route, Switch} from "react-router";

import Home from "../home/home";
import Cadastro from "../cadastros/cadastro.jsx"
import Suporte from "../suporte/suporte";

export default props => (
    <div className="content-wrapper">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/cadastro" component={Cadastro}/>
            <Route path="/suporte" component={Suporte}/>
            <Redirect from="*" to="/"/>
        </Switch>
    </div>
)