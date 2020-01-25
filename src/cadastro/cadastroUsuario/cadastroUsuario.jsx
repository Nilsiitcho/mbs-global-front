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

    //Coluna 1
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [foto, setFoto] = useState("");
    const [senha, setSenha] = useState("");
    const [status, setStatus] = useState("Inativo");

    //Coluna 2
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [endereco, setendereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [distribuicao, setDistribuicao] = useState("");

    //Coluna 3
    const [saque, setSaque] = useState("");
    const [saldoBloqueado, setSaldoBloqueado] = useState("");
    const [saqueBloqueado, setSaqueBloqueado] = useState("");
    const [qualificacao, setQualificacao] = useState("");
    const [dataCadastro, setDataCadastro] = useState("");
    const [dataAtivacao, setDataAtivacao] = useState("");
    const [vencimento, setVencimento] = useState("");

    //Coluna 4
    const [nivel, setNivel] = useState("");
    const [secundaria, setSecundaria] = useState("");
    const [code, setCode] = useState("");

    //Coluna 1
    const [nomeHasError, setNomeHasError] = useState(false);
    const [emailHasError, setEmailHasError] = useState(false);
    const [loginHasError, setLoginHasError] = useState(false);
    const [fotoHasError, setFotoHasError] = useState(false);
    const [senhaHasError, setSenhaHasError] = useState(false);

    //Coluna 2
    const [cpfHasError, setCpfHasError] = useState(false);
    const [telefoneHasError, setTelefoneHasError] = useState(false);
    const [celularHasError, setCelularHasError] = useState(false);
    const [dataNascimentoHasError, setDataNascimentoHasError] = useState(false);
    const [enderecoHasError, setEnderecoHasError] = useState(false);

    //Coluna 3
    const [qualificacaoHasError, setQualificacaoHasError] = useState(false);
    const [dataCadastroHasError, setDataCadastroHasError] = useState(false);
    const [dataAtivacaoHasError, setDataAtivacaoHasError] = useState(false);
    const [vencimentoHasError, setVencimentoHasError] = useState(false);

    //Coluna 4
    const [nivelHasError, setNivelHasError] = useState(false);
    const [secundariaHasError, setSecundariaHasError] = useState(false);
    const [codeHasError, setCodeHasError] = useState(false);

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
            },
            "login": () => {
                setLogin(e.target.value);
                setLoginHasError(false);
            },
            "foto": () => {
                setFoto(e.target.value);
                setFotoHasError(false);
            },
            "senha": () => {
                setSenha(e.target.value);
                setSenhaHasError(false);
            },
            "status": () => setStatus(e.target.value),
            "cpf": () => {
                setCpf(e.target.value);
                setCpfHasError(false);
            },
            "telefone": () => {
                setTelefone(e.target.value);
                setTelefoneHasError(false);
            },
            "celular": () => {
                setCelular(e.target.value);
                setCelularHasError(false);
            },
            "dataNascimento": () => {
                setDataNascimento(e.target.value);
                setDataNascimentoHasError(false);
            },
            "endereco": () => {
                setendereco(e.target.value);
                setEnderecoHasError(false);
            },
            "complemento": () => setComplemento(e.target.value),
            "distribuicao": () => setDistribuicao(e.target.value),
            "saque": () => setSaque(e.target.value),
            "saldoBloqueado": () => setSaldoBloqueado(e.target.value),
            "saqueBloqueado": () => setSaqueBloqueado(e.target.value),
            "qualificacao": () => {
                setQualificacao(e.target.value);
                setQualificacaoHasError(false);
            },
            "dataCadastro": () => {
                setDataCadastro(e.target.value);
                setDataCadastroHasError(false);
            },
            "dataAtivacao": () => {
                setDataAtivacao(e.target.value);
                setDataAtivacaoHasError(false);
            },
            "vencimento": () => {
                setVencimento(e.target.value);
                setVencimentoHasError(false);
            },
            "nivel": () => {
                setNivel(e.target.value);
                setNivelHasError(false);
            },
            "secundaria": () => {
                setSecundaria(e.target.error);
                setSecundariaHasError(false);
            },
            "code": () => {
                setCode(e.target.value);
                setCodeHasError(false);
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
        setLogin(usuario.login);
        setSenha(usuario.senha);
        setStatus(usuario.status);
        setFoto(usuario.foto);

        setCpf(usuario.cpf);
        setTelefone(usuario.cpf);
        setCelular(usuario.celular);
        setDataNascimento(usuario.data_nascimento);
        setendereco(usuario.endereco);
        setComplemento(usuario.complemento);
        setDistribuicao(usuario.distribuicao);

        setSaque(usuario.saque);
        setSaldoBloqueado(usuario.saldoBloqueado);
        setSaqueBloqueado(usuario.saquebloqueado);
        setQualificacao(usuario.qualificacao);
        setDataCadastro(usuario.data_cadastro);
        setDataAtivacao(usuario.data_ativacao);
        setVencimento(usuario.vencimento);

        setNivel(usuario.nivel);
        setSecundaria(usuario.secundaria);
        setCode(usuario.code);
    }

    function clearForm() {
        setId("");

        setNome("");
        setNome("");
        setNomeHasError(false);

        setEmail("");
        setEmailHasError(false);

        setLogin("");
        setLoginHasError(false);

        setSenha("");
        setSenhaHasError(false);

        setFoto("");
        setFotoHasError(false);

        setStatus("Inativo");

        setCpf("");
        setCpfHasError(false);

        setTelefone("");
        setTelefoneHasError(false);

        setCelular("");
        setCelularHasError(false);

        setDataNascimento("");
        setDataNascimentoHasError(false);

        setendereco("");
        setEnderecoHasError(false);

        setComplemento("");
        setDistribuicao("");
        setSaque("");
        setSaldoBloqueado("");
        setSaqueBloqueado("");

        setQualificacao("");
        setQualificacaoHasError(false);

        setDataCadastro("");
        setDataCadastroHasError(false);

        setDataAtivacao("");
        setDataAtivacaoHasError(false);

        setVencimento("");
        setVencimentoHasError(false);

        setNivel("");
        setNivelHasError(false);

        setSecundaria("");
        setSecundariaHasError(false);

        setCode("");
        setCodeHasError(false);

        setBotaoLabel("Cadastrar");
        setReadOnly(false);
    }

    function createBody() {
        const usuarioId = id === "" ? null : id;
        return {
            "id": usuarioId,
            "nome": nome,
            "email": email,
            "login": login,
            "senha": senha,
            "foto": foto,
            "status": status,
            "cpf": cpf,
            "telefone": telefone,
            "celular": celular,
            "data_nascimento": dataNascimento,
            "endereco": endereco,
            "complemento": complemento,
            "distribuicao": distribuicao,
            "saque": saque,
            "saldoBloqueado": saldoBloqueado,
            "saquebloqueado": saqueBloqueado,
            "qualificacao": qualificacao,
            "data_cadastro": dataCadastro,
            "data_ativacao": dataAtivacao,
            "vencimento": vencimento,
            "nivel": nivel,
            "secundaria": secundaria,
            "code": code
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
        fields.push(createValidator(email, "email", () => setEmailHasError(true)));
        fields.push(createValidator(login, "text", () => setLoginHasError(true)));
        fields.push(createValidator(senha, "senha", () => setSenhaHasError(true)));
        fields.push(createValidator(foto, "text", () => setFotoHasError(true)));
        fields.push(createValidator(cpf, "cpf", () => setCpfHasError(true)));
        fields.push(createValidator(telefone, "telefone", () => setTelefoneHasError(true)));
        fields.push(createValidator(celular, "telefone", () => setCelularHasError(true)));
        fields.push(createValidator(dataNascimento, "date", () => setDataNascimentoHasError(true)));
        fields.push(createValidator(endereco, "text", () => setEnderecoHasError(true)));
        fields.push(createValidator(qualificacao, "text", () => setQualificacaoHasError(true)));
        fields.push(createValidator(dataCadastro, "date", () => setDataCadastroHasError(true)));
        fields.push(createValidator(dataAtivacao, "date", () => setDataAtivacaoHasError(true)));
        fields.push(createValidator(vencimento, "date", () => setVencimentoHasError(true)));
        fields.push(createValidator(nivel, "text", () => setNivelHasError(true)));
        fields.push(createValidator(secundaria, "text", () => setSecundariaHasError(true)));
        fields.push(createValidator(code, "text", () => setCodeHasError(true)));
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
                                        placeholder="Informe o Email" type="email" hasError={emailHasError}
                                        value={email} onChange={handleChange}/>

                            <LabelInput name="login" label="Login" readOnly={readOnly}
                                        placeholder="Informe o Login" type="text" hasError={loginHasError}
                                        value={login} onChange={handleChange}/>

                            <LabelInput name="foto" label="Foto" readOnly={readOnly}
                                        placeholder="Informe o Foto" type="text" hasError={fotoHasError}
                                        value={foto} onChange={handleChange}/>

                            <LabelInput name="senha" label="Senha" readOnly={readOnly}
                                        placeholder="Informe a Senha" type="password" hasError={senhaHasError}
                                        value={senha} onChange={handleChange}/>

                            <label htmlFor="status">Status</label>
                            <select name="status" className="form-control" disabled={readOnly} readOnly={readOnly}
                                    onChange={handleChange}>
                                <option value="Inativo">Inativo</option>
                                <option value="Ativo">Ativo</option>
                                <option value="Pre">Pre</option>
                            </select>
                        </div>
                    </Grid>

                    <Grid cols="12 3">
                        <LabelInput name="cpf" label="CPF" readOnly={readOnly}
                                    placeholder="Informe o CPF" type="text" hasError={cpfHasError}
                                    value={cpf} onChange={handleChange}/>

                        <LabelInput name="telefone" label="Telefone" readOnly={readOnly}
                                    placeholder="Informe o Telefone" type="text" hasError={telefoneHasError}
                                    value={telefone} onChange={handleChange}/>

                        <LabelInput name="celular" label="Celular" readOnly={readOnly}
                                    placeholder="Informe o Celular" type="text" hasError={celularHasError}
                                    value={celular} onChange={handleChange}/>

                        <LabelInput name="dataNascimento" label="Data Nascimento" readOnly={readOnly}
                                    placeholder="Informe a Data de Nascimento" type="date"
                                    hasError={dataNascimentoHasError}
                                    value={dataNascimento} onChange={handleChange}/>

                        <LabelInput name="endereco" label="Endereço" readOnly={readOnly}
                                    placeholder="Informe o Endereço" type="text" hasError={enderecoHasError}
                                    value={endereco} onChange={handleChange}/>

                        <LabelInput name="complemento" label="Complemento" readOnly={readOnly}
                                    placeholder="Informe o Complemento" type="text"
                                    value={complemento} onChange={handleChange}/>

                        <LabelInput name="distribuicao" label="Distribuição" readOnly={readOnly}
                                    placeholder="Informe a Distribuição" type="text"
                                    value={distribuicao} onChange={handleChange}/>
                    </Grid>

                    <Grid cols="12 3">
                        <LabelInput name="saque" label="Saque" readOnly={readOnly}
                                    placeholder="Informe o valor do Saque" type="text"
                                    value={saque} onChange={handleChange}/>

                        <LabelInput name="saldoBloqueado" label="Saldo Bloqueado" readOnly={readOnly}
                                    placeholder="Informe o valor do Saldo Bloqueado" type="text"
                                    value={saldoBloqueado} onChange={handleChange}/>

                        <LabelInput name="saqueBloqueado" label="Saque Bloqueado" readOnly={readOnly}
                                    placeholder="Informe o valor do Saque Bloqueado" type="text"
                                    value={saqueBloqueado} onChange={handleChange}/>

                        <LabelInput name="qualificacao" label="Qualificação" readOnly={readOnly}
                                    placeholder="Informe a Qualificação" type="text" hasError={qualificacaoHasError}
                                    value={qualificacao} onChange={handleChange}/>

                        <LabelInput name="dataCadastro" label="Data de Cadastro" readOnly={readOnly}
                                    placeholder="Informe a Data de Cadastro" type="date"
                                    hasError={dataCadastroHasError}
                                    value={dataCadastro} onChange={handleChange}/>

                        <LabelInput name="dataAtivacao" label="Data de Ativação" readOnly={readOnly}
                                    placeholder="Informe a Data de Ativação" type="date"
                                    hasError={dataAtivacaoHasError}
                                    value={dataAtivacao} onChange={handleChange}/>

                        <LabelInput name="vencimento" label="Data de Vencimento" readOnly={readOnly}
                                    placeholder="Informe a Data de Vencimento" type="date"
                                    hasError={vencimentoHasError}
                                    value={vencimento} onChange={handleChange}/>
                    </Grid>

                    <Grid cols="12 3">
                        <LabelInput name="nivel" label="Nível" readOnly={readOnly}
                                    placeholder="Informe o Nível" type="text" hasError={nivelHasError}
                                    value={nivel} onChange={handleChange}/>

                        <LabelInput name="secundaria" label="Secundaria" readOnly={readOnly}
                                    placeholder="Informe o valor da Secundária" type="text"
                                    hasError={secundariaHasError}
                                    value={secundaria} onChange={handleChange}/>

                        <LabelInput name="code" label="Código" readOnly={readOnly}
                                    placeholder="Informe o valor do Código" type="text"
                                    hasError={codeHasError}
                                    value={code} onChange={handleChange}/>
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