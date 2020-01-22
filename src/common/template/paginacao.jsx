import React from "react";

function renderPages(totalDePaginas, paginaAtual, callBack) {
    const pages = [];

    for (let i = 1; i <= totalDePaginas; i++) {
        const page = <li key={i} className="page-item">
            <button
                className={`page-button ${paginaAtual === i ? "page-button-active" : ""}`}
                onClick={() => callBack(i)}>{i}</button>
        </li>;
        pages.push(page);
    }
    return pages;
}

function getNextPage(paginaAtual, totalDePaginas) {
    const proximaPagina = paginaAtual + 1;
    return proximaPagina <= totalDePaginas ? proximaPagina : paginaAtual;
}

function getLastPage(paginaAtual) {
    const paginaAnterior = paginaAtual - 1;
    return paginaAnterior >= 1 ? paginaAnterior : 1;
}

export default props => {
    return (
        <ul className="pagination ">
            <li key={"anterior"} className="page-item"
                onClick={() => props.callBack(getLastPage(props.paginaAtual))}>
                <button
                    className="page-button">Anterior
                </button>
            </li>
            {renderPages(props.totalDePaginas, props.paginaAtual, props.callBack)}
            <li key={"proxima"} className="page-item"
                onClick={() => props.callBack(getNextPage(props.paginaAtual, props.totalDePaginas))}>
                <button
                    className="page-button">Próximo
                </button>
            </li>
        </ul>
    )
}
