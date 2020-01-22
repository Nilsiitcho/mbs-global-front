import React, {useEffect, useState} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import ProdutoImagem from "./produtoimagem";
import axios from "axios";

const Produtos = props => {

    const [produtos, setProdutos] = useState([]);

    async function getData() {
        const {data} = await axios.get('http://localhost:3001/produto/index');
        setProdutos(data)
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
        <div>
            <ContentHeader title="Produtos"/>
            <Content>
                {renderProduto()}
            </Content>
        </div>
    )
};

export default Produtos;

