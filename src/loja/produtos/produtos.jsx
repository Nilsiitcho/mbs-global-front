import React, {Fragment, useEffect, useState} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import ProdutoImagem from "./produtoimagem";
import Row from "../../common/layout/row";
import Grid from "../../common/layout/grid";
import Pages from "../../common/template/paginacao";
import axios from "axios";

export default () => {

    const [produtos, setProdutos] = useState([]);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [paginaAtual, setPaginaAtual] = useState(1);

    async function getData(page = 1) {
        const {data} = await axios.get(`http://localhost:3001/produto?limit=5&skip=${page}`);
        const pages = data.pages;
        setTotalPaginas(pages);
        setPaginaAtual(page);
        setProdutos(data.docs);
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
                    <Grid cols="12 6">
                        <Pages totalDePaginas={totalPaginas} paginaAtual={paginaAtual}
                               callBack={(data) => getData(data)}/>
                    </Grid>
                </Row>
                <Row>
                    {renderProduto()}
                </Row>
                <Row>
                    <Grid cols="12 6">
                        <Pages totalDePaginas={totalPaginas} paginaAtual={paginaAtual}
                               callBack={(data) => getData(data)}/>
                    </Grid>
                </Row>
            </Content>
        </Fragment>
    )
};

