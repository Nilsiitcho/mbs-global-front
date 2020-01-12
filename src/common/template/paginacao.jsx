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

export default props => {
    return (
        <ul className="pagination ">
            <li key={"anterior"} className="page-item" onClick={() => props.callBack(props.lastPage)}>
                <button
                    className="page-button">Anterior
                </button>
            </li>
            {renderPages(props.totalDePaginas, props.paginaAtual, props.callBack)}
            <li key={"proxima"} className="page-item" onClick={() => props.callBack(props.nextPage)}>
                <button
                    className="page-button">Próximo
                </button>
            </li>
        </ul>
    )
}
