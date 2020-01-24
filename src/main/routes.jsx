import React from "react";
import {Redirect, Route, Switch} from "react-router";

import Home from "../home/home";
import Suporte from "../suporte/suporte";
import Diretos from "../rede/diretos/diretos"
import Retiradas from "../financeiro/retiradas/retiradas"
import Historico from "../financeiro/historico/historico";
import MeusPedidos from "../loja/meusPedidos/meusPedidos";
import Produtos from "../loja/produtos/produtos"
import CadastroUsuario from "../cadastro/cadastroUsuario/cadastroUsuario";
import CadastroProduto from "../cadastro/cadastroProduto/cadastroProduto";

export default props => (
    <div className="content-wrapper">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/cadastro/usuario" component={CadastroUsuario}/>
            <Route path="/cadastro/produto" component={CadastroProduto}/>
            <Route path="/loja/meusPedidos" component={MeusPedidos}/>
            <Route path="/loja/produtos" component={Produtos}/>
            <Route path="/rede/diretos" component={Diretos}/>
            <Route path="/financeiro/retiradas" component={Retiradas}/>
            <Route path="/financeiro/historico" component={Historico}/>
            <Route path="/suporte" component={Suporte}/>
            <Redirect from="*" to="/"/>
        </Switch>
    </div>
)
