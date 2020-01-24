import React, {Fragment, useEffect, useState} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import LabelInput from "../../common/template/labelInput";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Lista from "../../common/template/lista";
import Pages from "../../common/template/paginacao";
import Loading from "../../common/template/loading";

import {toast} from "react-toastify";
import axios from "axios";

export default () => {
    const [produtos, setProdutos] = useState([]);

    const [id, setId] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [estoque, setEstoque] = useState(null);
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(null);
    const [precoAtv, setPrecoAtv] = useState(null);
    const [bonus, setBonus] = useState(null);
    const [bonusAtv, setBonusAtv] = useState(null);
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [peso, setPeso] = useState(null);
    const [status, setStatus] = useState("RASCUNHO");
    const [thumb, setThumb] = useState("");

    const [tituloHasError, setTituloHasError] = useState(false);
    const [categoriaHasError, setCategoriaHasError] = useState(false);
    const [tipoHasError, setTipoHasError] = useState(false);
    const [pesoHasError, setPesoHasError] = useState(false);

    const [botaoLabel, setBotaoLabel] = useState("Cadastrar");
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    function handleChange(e) {
        const setters = {
            "id": () => setId(e.target.value),
            "titulo": () => {
                setTitulo(e.target.value);
                setTituloHasError(false);
            },
            "estoque": () => setEstoque(e.target.value),
            "descricao": () => setDescricao(e.target.value),
            "preco": () => setPreco(e.target.value),
            "precoAtv": () => setPrecoAtv(e.target.value),
            "bonus": () => setBonus(e.target.value),
            "bonusAtv": () => setBonusAtv(e.target.value),
            "categoria": () => {
                setCategoria(e.target.value);
                setCategoriaHasError(false);
            },
            "tipo": () => {
                setTipo(e.target.value);
                setTipoHasError(false);
            },
            "thumb": () => setThumb(e.target.value),
            "status": () => setStatus(e.target.value),
            "peso": () => {
                setPeso(e.target.value);
                setPesoHasError(false);
            }
        };
        setters[e.target.name]();
    }

    async function getData(page = 1) {
        setLoading(true);
        const {data} = await axios.get(`http://localhost:3001/produto?limit=10&skip=${page}`);
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
        setLoading(false);
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
        const {data} = await axios.get(`http://localhost:3001/produto/${id}`);
        const produto = data[0];

        setId(produto.id);
        setTitulo(produto.titulo);
        setEstoque(produto.estoque);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setPrecoAtv(produto.preco_atv);
        setBonus(produto.bonus);
        setBonusAtv(produto.bonus_atv);
        setCategoria(produto.categoria);
        setTipo(produto.tipo);
        setPeso(produto.peso);
        setStatus(produto.status);
        setThumb(produto.thumb);
    }

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
        if (peso == null || peso === 0) {
            setPesoHasError(true);
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
        await doRequest("delete");
    }

    async function atualizar() {
        await doRequest("put");
    }

    async function cadastrar() {
        await doRequest("post");
    }

    async function doRequest(method) {
        if (method !== "delete") {
            if (validateFields()) {
                const pagamentoId = id != null ? id : '';
                const body = createBody();
                axios[method](`http://localhost:3001/produto/${pagamentoId}`, body)
                    .then(() => {
                        toast.success("Produto salvo com sucesso");
                    }).catch(err => {
                    toast.error("Falha ao salvar produto!");
                });
            } else {
                toast.error("Alguns campos não foram preenchidos corretamente!");
            }
        } else {
            axios.delete(`http://localhost:3001/produto/${id}`)
                .then(() => {
                    toast.success("Produto excluído com sucesso");
                }).catch(err => {
                toast.error("Falha ao excluir produto!");
            });
        }
        await getData();
        clearForm();
    }

    function createBody() {
        const produtoId = id === "" ? null : id;
        return {
            "id": produtoId,
            "titulo": titulo,
            "estoque": estoque,
            "descricao": descricao,
            "preco": preco,
            "preco_atv": precoAtv,
            "bonus": bonus,
            "bonus_atv": bonusAtv,
            "categoria": categoria,
            "tipo": tipo,
            "status": status,
            "thumb": thumb,
            "peso": peso
        }
    }

    function clearForm() {
        setId("");
        setTitulo("");
        setEstoque("");
        setDescricao("");
        setPreco("");
        setPrecoAtv("");
        setBonus("");
        setBonusAtv("");
        setCategoria("");
        setTipo("");
        setStatus("RASCUNHO");
        setPeso("");
        setThumb("");
        setBotaoLabel("Cadastrar");

        clearErrors();
    }

    function clearErrors() {
        setTituloHasError(false);
        setCategoriaHasError(false);
        setTipoHasError(false);
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

    function renderData() {
        if (isLoading) {
            return (
                <div className="loading-cadastro-produtos">
                    <Loading height={100} width={100}/>
                </div>
            )
        } else {
            return (
                <Fragment>
                    <Lista cols={["ID", "TITULO", "AÇÕES"]} items={produtos}/>
                    <Pages totalDePaginas={totalPaginas} paginaAtual={paginaAtual}
                           callBack={(data) => getData(data)}/>
                </Fragment>
            )
        }
    }

    return (
        <Fragment>
            <ContentHeader title="Cadastro de Produtos"/>
            <Content>
                <Row>
                    <Grid cols="12 3">
                        <div className="form-group">
                            <LabelInput name="id" label="ID"
                                        placeholder="" type="text"
                                        value={id} onChange={handleChange} readOnly/>

                            <LabelInput name="titulo" label="Título"
                                        placeholder="Informe o título" type="text" hasError={tituloHasError}
                                        value={titulo} onChange={handleChange}/>

                            <LabelInput name="descricao" label="Descrição"
                                        placeholder="Informe a decsricao" type="text"
                                        value={descricao} onChange={handleChange}/>

                            <LabelInput name="categoria" label="Categoria"
                                        placeholder="Informe a Categoria" type="text" hasError={categoriaHasError}
                                        value={categoria} onChange={handleChange}/>

                            <LabelInput name="tipo" label="Tipo"
                                        placeholder="Informe o tipo" type="text" hasError={tipoHasError}
                                        value={tipo} onChange={handleChange}/>

                            <LabelInput name="thumb" label="URL da Imagem"
                                        placeholder="Informe a URL para a imagem" type="text"
                                        value={thumb} onChange={handleChange}/>

                            <label htmlFor="status">Status</label>
                            <select name="status" className="form-control" onChange={handleChange}>
                                <option value="RASCUNHO">Rascunho</option>
                                <option value="PUBLICADO">Publicado</option>
                            </select>
                        </div>
                    </Grid>
                    <Grid cols="12 3">
                        <LabelInput name="preco" label="Preço"
                                    placeholder="Informe o valor" type="number"
                                    value={preco} onChange={handleChange}/>
                        <LabelInput name="precoAtv" label="Preço Atv"
                                    placeholder="Informe o valor do preço Atv" type="number"
                                    value={precoAtv} onChange={handleChange}/>
                        <LabelInput name="bonus" label="Bônus"
                                    placeholder="Informe o valor do bônus" type="number"
                                    value={bonus} onChange={handleChange}/>
                        <LabelInput name="bonusAtv" label="Bônus Atv"
                                    placeholder="Informe o valor do bônus Atv" type="number"
                                    value={bonusAtv} onChange={handleChange}/>
                        <LabelInput name="peso" label="Peso"
                                    placeholder="Informe o peso do produto" type="number" hasError={pesoHasError}
                                    value={peso} onChange={handleChange}/>
                        <LabelInput name="estoque" label="Estoque"
                                    placeholder="Informe a quantidade em estoque" type="number"
                                    value={estoque} onChange={handleChange}/>
                        <div className="box-footer">
                            <button style={{width: "90px"}} className={`btn ${setSubmitClass()}`}
                                    onClick={handleSubmit}>{botaoLabel}</button>
                            <button className="btn btn-default margin-left" onClick={clearForm}>Cancelar</button>
                        </div>
                    </Grid>
                    <Grid cols="12 6">
                        {renderData()}
                    </Grid>
                </Row>
            </Content>
        </Fragment>
    )
}