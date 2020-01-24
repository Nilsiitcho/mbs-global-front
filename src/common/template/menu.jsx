import React from "react";
import MenuItem from "./menuItem";
import MenuTree from "./menuTree";

export default props => (
    <ul className="sidebar-menu">
        <MenuItem path="/" label="Home" icon="home"/>

        <MenuTree label="Cadastro" icon="edit">
            <MenuItem path="/cadastro/usuario" label="Usuário" icon="user"/>
            <MenuItem path="/cadastro/produto" label="Produto" icon="shopping-bag"/>
        </MenuTree>

        <MenuTree label="Loja" icon="cart-plus">
            <MenuItem path="/loja/produtos" label="Produtos" icon="shopping-bag"/>
            <MenuItem path="/loja/meusPedidos" label="Meus pedidos" icon="shopping-cart"/>
        </MenuTree>

        <MenuTree label="Rede" icon="connectdevelop">
            <MenuItem path="/rede/unilevel" label="Unilevel" icon="sitemap"/>
            <MenuItem path="/rede/diretos" label="Direto" icon="users"/>
        </MenuTree>

        <MenuTree label="Financeiro" icon="usd">
            <MenuItem path="/financeiro/historico" label="Histórico" icon="file-text-o"/>
            <MenuItem path="/financeiro/retiradas" label="Retiradas" icon="money"/>
        </MenuTree>

        <MenuItem path="/suporte" label="Suporte" icon="phone"/>
        <MenuItem path="/contrato" label="Contrato" icon="file-text-o"/>
    </ul>
)