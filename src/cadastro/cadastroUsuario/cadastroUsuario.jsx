import React, {Fragment, useState, useEffect} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Lista from "../../common/template/lista";
import LabelInput from "../../common/template/labelInput";
import Pages from "../../common/template/paginacao";
import Loading from "../../common/template/loading";

import fieldsValidator from "../../utils/fieldValidator";

import {toast} from "react-toastify";
import axios from "axios";

export default () => {
    const BASE_URL = "http://localhost:3001/usuario";

    const [usuarios, setUsuarios] = useState([]);

    const [id, setId] = useState("");

    const [totalPaginas, setTotalPaginas] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const [botaoLabel, setBotaoLabel] = useState("Cadastrar");
    const [readOnly, setReadOnly] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    function handleChange(e){
        const setters = {
            "id": () => setId(e.target.value)
        };
      setters[e.target.name]();
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

    async function fillForm(id){
        const {data} = await axios.get(`${BASE_URL}/${id}`);
        const usuario = data[0];

        setId(usuario.id);
    }

    function createBody(){
        const usuarioId = id === "" ? null : id;
        return {
            "id": usuarioId
        }
    }

    function clearForm(){
        setId("");
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
                        <h1>form1</h1>
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
                    <Grid cols="12">
                        {renderData()}
                    </Grid>
                </Row>
            </Content>
        </Fragment>
    )
}