import React from "react";

export default props => (
    <div className="info-box">
        <span className={`info-box-icon bg-${props.iconColor}`}><i className={`fa fa-${props.icon}`}/></span>
        <div className="info-box-content">
            <span className="info-box-text">{props.text}</span>
            {props.children}
        </div>
    </div>
)