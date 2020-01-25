import React, {Fragment, useState, useEffect} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Lista from "../../common/template/lista";
import LabelInput from "../../common/template/labelInput";
import Pages from "../../common/template/paginacao";
import Loading from "../../common/template/loading";

import axios from "axios";
import {toast} from "react-toastify";
import fieldsValidator from "../../utils/fieldValidator";

export default () => {
    const BASE_URL = "http://localhost:3001/usuario";

    const [usuarios, setUsuarios] = useState([]);

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const [nomeHasError, setNomeHasError] = useState(false);
    const [emailHasError, setEmailHasError] = useState(false);

    const [totalPaginas, setTotalPaginas] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const [botaoLabel, setBotaoLabel] = useState("Cadastrar");
    const [readOnly, setReadOnly] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    function handleChange(e) {
        const setters = {
            "id": () => setId(e.target.value),
            "nome": () => {
                setNome(e.target.value);
                setNomeHasError(false);
            },
            "email": () => {
                setEmail(e.target.value);
                setEmailHasError(false);
            }
        };
        setters[e.target.name]();
    }

    async function fillForm(id) {
        const {data} = await axios.get(`${BASE_URL}/${id}`);
        const usuario = data[0];

        setId(usuario.id);
        setNome(usuario.nome);
        setEmail(usuario.email);
    }

    function clearForm() {
        setId("");

        setNome("");
        setNome("");
        setNomeHasError(false);

        setEmail("");
        setEmailHasError(false);

        setReadOnly(false);
    }

    function createBody() {
        const usuarioId = id === "" ? null : id;
        return {
            "id": usuarioId,
            "nome": nome,
            "email": email
        }
    }

    function validateFields() {
        function createValidator(field, type, callBack) {
            return {
                field: field,
                type: type,
                callBack: callBack
            }
        }

        const fields = [];
        fields.push(createValidator(nome, "text", () => setNomeHasError(true)));
        fields.push(createValidator(email, "text", () => setEmailHasError(true)));
        return fieldsValidator.validate(fields);
    }

    async function getData(page = 1) {
        setLoading(true);
        const {data} = await axios.get(`${BASE_URL}?limit=10&skip=${page}`);
        setTotalPaginas(data.pages);
        setPaginaAtual(page);
        const usuariosMap = data.docs.map(usuario => {
            return {
                id: usuario.id,
                nome: usuario.nome,
                login: usuario.login,
                cpf: usuario.cpf,
                email: usuario.email,
                status: usuario.status
            }
        });

        usuariosMap.forEach(usuario => {
            usuario.acao = <div>
                <button className="btn btn-info" onClick={() => editUsuario(usuario.id)}><i className="fa fa-edit"/>
                </button>
                <button className="btn btn-danger margin-left" onClick={() => deleteUsuario(usuario.id)}><i
                    className="fa fa-trash"/>
                </button>
            </div>
        });
        setUsuarios(usuariosMap);
        setLoading(false);
    }

    async function editUsuario(id) {
        await fillForm(id);
        setBotaoLabel("Atualizar");
        setReadOnly(false);
    }

    async function deleteUsuario(id) {
        await fillForm(id);
        setBotaoLabel("Apagar");
        setReadOnly(true);
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

    function handleSubmit() {
        switch (botaoLabel) {
            case "Cadastrar":
                doRequest("post");
                return;
            case "Apagar":
                doRequest("delete");
                return;
            default:
                doRequest("put");
                return;
        }

        function doRequest(method) {
            function doDelete() {
                axios.delete(`${BASE_URL}/${id}`)
                    .then(async () => {
                        toast.success("Registro excluído com sucesso");
                        await getData();
                        clearForm();
                    }).catch(err => {
                    toast.error("Falha ao excluir Registro!");
                });
            }

            function doPostPut() {
                const registroId = id != null ? id : '';
                const body = createBody();
                axios[method](`${BASE_URL}/${registroId}`, body)
                    .then(async () => {
                        toast.success("Registro salvo com sucesso");
                        await getData();
                        clearForm();
                    }).catch(err => {
                    toast.error("Falha ao salvar registro!");
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
                    <Lista cols={["ID", "NOME", "LOGIN", "CPF", "EMAIL", "STATUS", "AÇÕES"]} items={usuarios}/>
                    <Pages totalDePaginas={totalPaginas} paginaAtual={paginaAtual}
                           callBack={(data) => getData(data)}/>
                </Fragment>
            )
        }
    }

    return (
        <Fragment>
            <ContentHeader title="Cadastro de usuário"/>
            <Content>
                <Row>
                    <Grid cols="12 3">
                        <div className="form-group">
                            <LabelInput name="id" label="ID"
                                        placeholder="" type="text"
                                        value={id} onChange={handleChange} readOnly/>

                            <LabelInput name="nome" label="Nome" readOnly={readOnly}
                                        placeholder="Informe o Nome" type="text" hasError={nomeHasError}
                                        value={nome} onChange={handleChange}/>

                            <LabelInput name="email" label="Email" readOnly={readOnly}
                                        placeholder="Informe o Email" type="text" hasError={emailHasError}
                                        value={email} onChange={handleChange}/>
                        </div>
                    </Grid>

                    <Grid cols="12 3">
                        <h1>form2</h1>
                    </Grid>

                    <Grid cols="12 3">
                        <h1>form3</h1>
                    </Grid>

                    <Grid cols="12 3">
                        <h1>form4</h1>
                    </Grid>
                </Row>
                <Row>
                    <div className="box-footer">
                        <button style={{width: "90px"}} className={`btn ${setSubmitClass()}`}
                                onClick={handleSubmit}>{botaoLabel}</button>
                        <button className="btn btn-default margin-left" onClick={clearForm}>Cancelar</button>
                    </div>
                </Row>
                <hr/>
                <Row>
                    <Grid cols="12">
                        {renderData()}
                    </Grid>
                </Row>
            </Content>
        </Fragment>
    )
}