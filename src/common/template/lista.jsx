import React from "react";

export default props => (
    <div>
        <table className="table table-striped table-hover">
            <thead>
            <tr>
                {renderColums(props.cols)}
            </tr>
            </thead>
            <tbody>
            {renderRows(props.items)}
            </tbody>
        </table>
    </div>
)

function renderColums(cols) {
    return cols.map(col => {
        return (<th key={col}>{col}</th>)
    })
}

function renderRows(items = []) {
    return items.map(item => (
        <tr key={item.id}>
            {renderItemData(item)}
        </tr>
    ))
}

function renderItemData(item) {
    const tds = [];
    for (let data in item) {
        if (item.hasOwnProperty(data)) {
            tds.push(<td key={tds.length}>{item[data]}</td>)
        }
    }
    return tds
}
