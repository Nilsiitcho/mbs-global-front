import React from "react";
import MenuItem from "./menuItem";
import MenuTree from "./menuTree"

export default props => (
    <ul className="sidebar-menu">
        <MenuItem path="/" label="Home" icon="home"/>

        <MenuTree label="Loja" icon="shopping-cart">
            <MenuItem path="/loja/produtos" label="Produtos" icon="usd"/>
            <MenuItem path="/loja/meus-pedidos" label="Meus pedidos" icon="usd"/>
        </MenuTree>

        <MenuTree label="Rede" icon="connectdevelop">
            <MenuItem path="/rede/unilevel" label="Unilevel" icon="usd"/>
            <MenuItem path="/rede/direto" label="Direto" icon="sitemap"/>
        </MenuTree>

        <MenuTree label="Financeiro" icon="usd">
            <MenuItem path="/rede/historico" label="Histórico" icon="usd"/>
            <MenuItem path="/rede/retiradas" label="Retiradas" icon="money"/>
        </MenuTree>

        <MenuItem path="/suporte" label="Suporte" icon="phone"/>
        <MenuItem path="/contrato" label="Contrato" icon="file-text-o"/>
    </ul>
)