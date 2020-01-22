import React, {Fragment, useEffect, useState} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import LabelInput from "../../common/template/labelInput";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Lista from "../../common/template/lista";
import axios from "axios";
import Pages from "../../common/template/paginacao";

export default () => {
    const [produtos, setProdutos] = useState([]);

    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [estoque, setEstoque] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState(0);

    const [tituloHasError, setTituloHasError] = useState(false);
    const [categoriaHasError, setCategoriaHasError] = useState(false);
    const [tipoHasError, setTipoHasError] = useState(false);
    const [botaoLabel, setBotaoLabel] = useState("Cadastrar");
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);

    function handleChange(e) {
        const setters = {
            "id": () => setId(e.target.value),
            "titulo": () => setTitulo(e.target.value),
            "estoque": () => setEstoque(e.target.value),
            "descricao": () => setDescricao(e.target.value),
            "preco": () => setPreco(e.target.value),
            "bonus": () => setBonus(e.target.value),
            "categoria": () => setCategoria(e.target.value),
            "tipo": () => setTipo(e.target.value),
            "status": () => setStatus(e.target.value)
        };
        setters[e.target.name]();
    }

    async function getData(page = 1) {
        const {data} = await axios.get(`http://localhost:3001/produto/index?limit=5&skip=${page}`);
        const pages = data.pages;
        setTotalPaginas(pages);
        setPaginaAtual(page);
        const produtosMap = data.docs.map(produto => {
            return {
                id: produto.id,
                titulo: produto.titulo
            }
        });

        produtosMap.forEach(produto => (
            produto.acao = <div>
                <button className="btn btn-info" onClick={() => editProduto(produto.id)}><i className="fa fa-edit"/>
                </button>
                <button className="btn btn-danger margin-left" onClick={() => deleteProduto(produto.id)}><i
                    className="fa fa-trash"/>
                </button>
            </div>
        ));
        setProdutos(produtosMap);
    }

    async function editProduto(id) {
        await fillForm(id);
        setBotaoLabel("Atualizar");
    }

    async function deleteProduto(id) {
        await fillForm(id);
        setBotaoLabel("Apagar");
    }

    async function fillForm(id) {
        const {data} = await axios.get(`http://localhost:3001/produto/show/${id}`);
        const produto = data[0];

        setId(produto.id);
        setTitulo(produto.titulo);
        setEstoque(produto.estoque);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setBonus(produto.bonus);
        setCategoria(produto.categoria);
        setTipo(produto.tipo);
    }

    useEffect(() => {
        getData();
    }, []);

    function validateFields() {
        let valid = true;
        if (titulo.length < 4) {
            setTituloHasError(true);
            valid = false;
        }
        if (categoria.length < 4) {
            setCategoriaHasError(true);
            valid = false
        }
        if (tipo.length < 4) {
            setTipoHasError(true);
            valid = false
        }
        return valid;
    }

    function handleSubmit() {
        switch (botaoLabel) {
            case "Cadastrar":
                cadastrar();
                return;
            case "Apagar":
                apagar();
                return;
            default:
                atualizar();
                return;
        }
    }

    async function apagar() {
        await axios.delete(`http://localhost:3001/produto/destroy/${id}`);
        await getData();
    }

    function atualizar() {
        if (validateFields()) {
            const body = createBody();
            axios.put(`http://localhost:3001/produto/update/${id}`, body);
        }
    }

    function cadastrar() {
        if (validateFields()) {
            const body = createBody();
            axios.post("http://localhost:3001/produto/store", body);
        }
    }

    function createBody() {
        return {
            "titulo": titulo,
            "estoque": estoque,
            "descricao": descricao,
            "preco": preco,
            "bonus": bonus,
            "thumb": "",
            "categoria": categoria,
            "tipo": tipo,
            "status": status
        }
    }


    function cancelar() {
        setId("");
        setTitulo("");
        setEstoque(0);
        setDescricao("");
        setPreco(0);
        setCategoria("");
        setTipo("");
        setBotaoLabel("Cadastrar");
    }

    function setSubmitClass() {
        switch (botaoLabel) {
            case "Cadastrar":
                return "btn-success";
            case "Apagar":
                return "btn-danger";
            default :
                return "btn-info";
        }
    }

    return (
        <Fragment>
            <ContentHeader title="Cadastro de Produtos"/>
            <Content>
                <Row>
                    <Grid cols="12 4">
                        <div className="box-body">
                            <div className="form-group">
                                <LabelInput name="id" label="ID"
                                            placeholder="" type="text"
                                            value={id} onChange={handleChange} readOnly/>
                                <LabelInput name="titulo" label="Título"
                                            placeholder="Informe o título" type="text" hasError={tituloHasError}
                                            value={titulo} onChange={handleChange}/>
                                <LabelInput name="estoque" label="Estoque"
                                            placeholder="Informe a quantidade em estoque" type="number"
                                            value={estoque} onChange={handleChange}/>
                                <LabelInput name="descricao" label="Descrição"
                                            placeholder="Informe a decsricao" type="text"
                                            value={descricao} onChange={handleChange}/>

                                <div className="col-xs-6">
                                    <LabelInput name="preco" label="Preço"
                                                placeholder="Informe o valor" type="number"
                                                value={preco} onChange={handleChange}/>
                                </div>
                                <div className="col-xs-6">
                                    <LabelInput name="bonus" label="Bônus"
                                                placeholder="Informe o valor do bônus" type="number"
                                                value={bonus} onChange={handleChange}/>
                                </div>

                                <LabelInput name="categoria" label="Categoria"
                                            placeholder="Informe a Categoria" type="text" hasError={categoriaHasError}
                                            value={categoria} onChange={handleChange}/>
                                <LabelInput name="tipo" label="Tipo"
                                            placeholder="Informe o tipo" type="text" hasError={tipoHasError}
                                            value={tipo} onChange={handleChange}/>

                                <label htmlFor="status">Status</label>
                                <select name="status" className="form-control" onChange={handleChange}>
                                    <option value="0">Rascunho</option>
                                    <option value="1">Publicado</option>
                                </select>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button style={{width: "90px"}} className={`btn ${setSubmitClass()}`}
                                    onClick={handleSubmit}>{botaoLabel}</button>
                            <button className="btn btn-default margin-left" onClick={cancelar}>Cancelar</button>
                        </div>
                    </Grid>
                    <Grid cols="12 8">
                        <Lista cols={["ID", "TITULO", "AÇÕES"]} items={produtos}/>
                        <Pages totalDePaginas={totalPaginas} paginaAtual={paginaAtual}
                               callBack={(data) => getData(data)}/>
                    </Grid>
                </Row>
            </Content>
        </Fragment>
    )
}