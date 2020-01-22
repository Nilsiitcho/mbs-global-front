import React, {useState} from "react";
import Content from "../../common/template/content";
import ContentHeader from "../../common/template/contentHeader";
import LabelInput from "../../common/template/labelInput";
import Grid from "../../common/layout/grid";
import axios from "axios";

export default () => {

    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [estoque, setEstoque] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState(0);

    function handleChange(e) {
        const setters = {
            "id": () => setId(e.target.value),
            "titulo": () => setTitulo(e.target.value),
            "estoque": () => setEstoque(e.target.value),
            "descricao": () => setDescricao(e.target.value),
            "preco": () => setPreco(e.target.value),
            "categoria": () => setCategoria(e.target.value),
            "tipo": () => setTipo(e.target.value),
            "status": () => setStatus(e.target.value)
        };
        setters[e.target.name]();
    }

    function cadastrar() {
        const body ={
          "titulo": titulo,
          "estoque": estoque,
          "decsricao": descricao,
          "preco": preco,
          "bonus": "",
          "thumb": "",
          "categoria": categoria,
          "tipo": tipo,
          "status": status
        };
        axios.post("http://localhost:3001/produto/store", body)
    }

    function cancelar() {
        setId("");
        setTitulo("");
        setEstoque(0);
        setDescricao("");
        setPreco(0);
        setCategoria("");
        setTipo("");
    }

    return (
        <div>
            <ContentHeader title="Cadastro de Produtos"/>
            <Content>
                <Grid cols="12 4">
                    <div className="box-body">
                        <div className="form-group">
                            <LabelInput name="id" label="ID"
                                        placeholder="" type="text"
                                        value={id} onChange={handleChange} readOnly/>
                            <LabelInput name="titulo" label="Título"
                                        placeholder="Informe o título" type="text"
                                        value={titulo} onChange={handleChange}/>
                            <LabelInput name="estoque" label="Estoque"
                                        placeholder="Informe a quantidade em estoque" type="number"
                                        value={estoque} onChange={handleChange}/>
                            <LabelInput name="descricao" label="Descrição"
                                        placeholder="Informe a decsricao" type="text"
                                        value={descricao} onChange={handleChange}/>
                            <LabelInput name="preco" label="Preço"
                                        placeholder="Informe o valor" type="number"
                                        value={preco} onChange={handleChange}/>
                            <LabelInput name="categoria" label="Categoria"
                                        placeholder="Informe a Categoria" type="text"
                                        value={categoria} onChange={handleChange}/>
                            <LabelInput name="tipo" label="Tipo"
                                        placeholder="Informe o tipo" type="text"
                                        value={tipo} onChange={handleChange}/>

                            <label htmlFor="status">Status</label>
                            <select name="status" className="form-control" onChange={handleChange}>
                                <option value="0">Rascunho</option>
                                <option value="1">Publicado</option>
                            </select>

                        </div>
                    </div>
                    <div className="box-footer">
                        <button className="btn btn-primary" onClick={cadastrar}>Cadastrar</button>
                        <button className="btn btn-default margin-left" onClick={cancelar}>Cancelar</button>
                    </div>
                </Grid>
            </Content>
        </div>
    )
}