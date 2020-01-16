import React from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import ProdutoImagem from "./produtoimagem";


export default props => (
    <div>
        <ContentHeader title="Produtos"/>
        <Content>
            <ProdutoImagem src="https://www.vagalume.com.br/lana-del-rey/images/lana-del-rey.jpg" title="Laninha"
                           valor="R$300,00" bonus="R$100,00" onClick={() => alert('comprei')}/>
        </Content>
    </div>
)