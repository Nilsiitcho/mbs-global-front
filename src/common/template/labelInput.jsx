import React from "react";

export default props => (
    <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input name={props.name} placeholder={props.placeholder}
               type={props.type} readOnly={props.readOnly}
               value={props.value} onChange={props.onChange}
               className={`form-control ${props.hasError ? 'has-error' : ''}`}/>
    </div>
)