import React from "react";

function renderPages(totalDePaginas, paginaAtual, callBack){
        const pages = [];

        for (let i = 1; i <= totalDePaginas; i++) {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            const page = <li className={`page-item ${paginaAtual === i ? "active active-custom" : ""}`}><a
                className="page-link" onClick={() => callBack(i)}>{i}</a></li>;
            pages.push(page);
        }
        return pages;
}

export default props => {
    return (
        <ul className="pagination ">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li className="page-item"><a className="page-link">Anterior</a></li>
            {renderPages(props.totalDePaginas, props.paginaAtual, props.callBack)}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li className="page-item"><a className="page-link">Próximo</a></li>
        </ul>
    )
}
