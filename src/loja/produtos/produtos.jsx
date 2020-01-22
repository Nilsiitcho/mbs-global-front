import React, {Fragment, useEffect, useState} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import ProdutoImagem from "./produtoimagem";
import Row from "../../common/layout/row";
import axios from "axios";

const Produtos = props => {

    const [produtos, setProdutos] = useState([]);

    async function getData() {
        const {data} = await axios.get('http://localhost:3001/produto/index?limit=5');
        setProdutos(data.docs)
    }

    useEffect(() => {
        getData();
    }, []);

    function renderProduto() {
        return produtos.map(produto => (
            <ProdutoImagem key={produto.id} src="https://www.vagalume.com.br/lana-del-rey/images/lana-del-rey.jpg"
                           title={produto.titulo}
                           valor={`R$ ${produto.preco}`} bonus={`R$ ${produto.bonus}`}
                           onClick={() => alert('comprei')}/>
        ))
    }

    return (
        <Fragment>
            <ContentHeader title="Produtos"/>
            <Content>
                <Row>
                    {renderProduto()}
                </Row>
            </Content>
        </Fragment>
    )
};

export default Produtos;

