import React, {Fragment, useEffect, useState} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import LabelInput from "../../common/template/labelInput";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Lista from "../../common/template/lista";
import Pages from "../../common/template/paginacao";
import Loading from "../../common/template/loading";

import fieldsValidator from "../../utils/fieldValidator";

import {toast} from "react-toastify";
import axios from "axios";

export default () => {
    const BASE_URL = "http://localhost:3001/produto";

    const [produtos, setProdutos] = useState([]);

    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [estoque, setEstoque] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [precoAtv, setPrecoAtv] = useState("");
    const [bonus, setBonus] = useState("");
    const [bonusAtv, setBonusAtv] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [peso, setPeso] = useState("");
    const [status, setStatus] = useState("RASCUNHO");
    const [thumb, setThumb] = useState("");

    const [tituloHasError, setTituloHasError] = useState(false);
    const [estoqueHasError, setEstoqueHasError] = useState(false);
    const [descricaoHasError, setDescricaoHasError] = useState(false);
    const [precoHasError, setPrecoHasError] = useState(false);
    const [precoAtvHasError, setPrecoAtvHasError] = useState(false);
    const [bonusHasError, setBonusHasError] = useState(false);
    const [bonusAtvHasError, setBonusAtvHasError] = useState(false);
    const [categoriaHasError, setCategoriaHasError] = useState(false);
    const [tipoHasError, setTipoHasError] = useState(false);
    const [pesoHasError, setPesoHasError] = useState(false);
    const [thumbHasError, setThumbHasError] = useState(false);

    const [readOnly, setReadOnly] = useState(false);
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
            "estoque": () => {
                setEstoque(e.target.value);
                setEstoqueHasError(false);
            },
            "descricao": () => {
                setDescricao(e.target.value);
                setDescricaoHasError(false);
            },
            "preco": () => {
                setPreco(e.target.value);
                setPrecoHasError(false);
            },
            "precoAtv": () => {
                setPrecoAtv(e.target.value);
                setPrecoAtvHasError(false);
            },
            "bonus": () => {
                setBonus(e.target.value);
                setBonusHasError(false);
            },
            "bonusAtv": () => {
                setBonusAtv(e.target.value);
                setBonusAtvHasError(false);
            },
            "categoria": () => {
                setCategoria(e.target.value);
                setCategoriaHasError(false);
            },
            "tipo": () => {
                setTipo(e.target.value);
                setTipoHasError(false);
            },
            "thumb": () => {
                setThumb(e.target.value);
                setThumbHasError(false);
            },
            "peso": () => {
                setPeso(e.target.value);
                setPesoHasError(false);
            },
            "status": () => setStatus(e.target.value)
        };
        setters[e.target.name]();
    }

    async function getData(page = 1) {
        setLoading(true);
        const {data} = await axios.get(`${BASE_URL}?limit=10&skip=${page}`);
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
        setReadOnly(false);
    }

    async function deleteProduto(id) {
        await fillForm(id);
        setBotaoLabel("Apagar");
        setReadOnly(true);
    }

    async function fillForm(id) {
        const {data} = await axios.get(`${BASE_URL}/${id}`);
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

    function createValidator(field, type, callBack) {
        return {
            field: field,
            type: type,
            callBack: callBack
        }
    }

    function validateFields() {
        const fields = [];
        fields.push(createValidator(titulo, "text", () => setTituloHasError(true)));
        fields.push(createValidator(descricao, "text", () => setDescricaoHasError(true)));
        fields.push(createValidator(categoria, "text", () => setCategoriaHasError(true)));
        fields.push(createValidator(tipo, "text", () => setTipoHasError(true)));
        fields.push(createValidator(thumb, "text", () => setThumbHasError(true)));
        fields.push(createValidator(preco, "number", () => setPrecoHasError(true)));
        fields.push(createValidator(precoAtv, "number", () => setPrecoAtvHasError(true)));
        fields.push(createValidator(bonus, "number", () => setBonusHasError(true)));
        fields.push(createValidator(bonusAtv, "number", () => setBonusAtvHasError(true)));
        fields.push(createValidator(peso, "number", () => setPesoHasError(true)));
        fields.push(createValidator(estoque, "number", () => setEstoqueHasError(true)));

        return fieldsValidator.validate(fields);
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
        function doDelete() {
            axios.delete(`${BASE_URL}/${id}`)
                .then(async () => {
                    toast.success("Produto excluído com sucesso");
                    await getData();
                    clearForm();
                }).catch(err => {
                toast.error("Falha ao excluir produto!");
            });
        }

        function doPostPut() {
            const pagamentoId = id != null ? id : '';
            const body = createBody();
            axios[method](`${BASE_URL}/${pagamentoId}`, body)
                .then(async () => {
                    toast.success("Produto salvo com sucesso");
                    await getData();
                    clearForm();
                }).catch(err => {
                toast.error("Falha ao salvar produto!");
            });
        }

        if (method === "delete") {
            doDelete();
        } else {
            if (validateFields()) {
                doPostPut();
            } else {
                toast.error("Alguns campos não foram preenchidos corretamente!");
            }
        }
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
        setPeso("");
        setThumb("");
        setStatus("RASCUNHO");
        setBotaoLabel("Cadastrar");
        setReadOnly(false);
        clearErrors();
    }

    function clearErrors() {
        setTituloHasError(false);
        setEstoqueHasError(false);
        setDescricaoHasError(false);
        setPrecoHasError(false);
        setPrecoAtvHasError(false);
        setBonusHasError(false);
        setBonusAtvHasError(false);
        setCategoriaHasError(false);
        setTipoHasError(false);
        setPesoHasError(false);
        setThumbHasError(false);
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

                            <LabelInput name="titulo" label="Título" readOnly={readOnly}
                                        placeholder="Informe o título" type="text" hasError={tituloHasError}
                                        value={titulo} onChange={handleChange}/>

                            <LabelInput name="descricao" label="Descrição" readOnly={readOnly}
                                        placeholder="Informe a decsrição" type="text" hasError={descricaoHasError}
                                        value={descricao} onChange={handleChange}/>

                            <LabelInput name="categoria" label="Categoria" readOnly={readOnly}
                                        placeholder="Informe a Categoria" type="text" hasError={categoriaHasError}
                                        value={categoria} onChange={handleChange}/>

                            <LabelInput name="tipo" label="Tipo" readOnly={readOnly}
                                        placeholder="Informe o tipo" type="text" hasError={tipoHasError}
                                        value={tipo} onChange={handleChange}/>

                            <LabelInput name="thumb" label="URL da Imagem" readOnly={readOnly}
                                        placeholder="Informe a URL para a imagem" type="text" hasError={thumbHasError}
                                        value={thumb} onChange={handleChange}/>

                            <label htmlFor="status">Status</label>
                            <select name="status" className="form-control" disabled={readOnly} readOnly={readOnly}
                                    onChange={handleChange}>
                                <option value="RASCUNHO">Rascunho</option>
                                <option value="PUBLICADO">Publicado</option>
                            </select>
                        </div>
                    </Grid>

                    <Grid cols="12 3">
                        <div className="form-group">
                            <LabelInput name="preco" label="Preço" readOnly={readOnly} step="0.01" min="0.00"
                                        placeholder="Informe o valor" type="number" hasError={precoHasError}
                                        value={preco} onChange={handleChange}/>

                            <LabelInput name="precoAtv" label="Preço Atv" readOnly={readOnly}
                                        placeholder="Informe o valor do preço Atv" type="number"
                                        hasError={precoAtvHasError} step="0.01" min="0.00"
                                        value={precoAtv} onChange={handleChange}/>

                            <LabelInput name="bonus" label="Bônus" readOnly={readOnly} step="0.01" min="0.00"
                                        placeholder="Informe o valor do bônus" type="number" hasError={bonusHasError}
                                        value={bonus} onChange={handleChange}/>

                            <LabelInput name="bonusAtv" label="Bônus Atv" readOnly={readOnly}
                                        placeholder="Informe o valor do bônus Atv" type="number"
                                        hasError={bonusAtvHasError} step="0.01" min="0.00"
                                        value={bonusAtv} onChange={handleChange}/>

                            <LabelInput name="peso" label="Peso" readOnly={readOnly} step="0.01" min="0.00"
                                        placeholder="Informe o peso do produto" type="number" hasError={pesoHasError}
                                        value={peso} onChange={handleChange}/>

                            <LabelInput name="estoque" label="Estoque" readOnly={readOnly} step="1" min="0"
                                        placeholder="Informe a quantidade em estoque" type="number"
                                        hasError={estoqueHasError}
                                        value={estoque} onChange={handleChange}/>
                        </div>

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