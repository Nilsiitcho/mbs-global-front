import React from "react";

import Grid from "../layout/grid";

export default props => (
    <Grid cols={props.cols}>
        <div className={`box box-${props.type}`}>
            <div className="box-header with-border">
                <h3 className="box-title">{props.header}</h3>
            </div>
            <div className="box-body">
                {props.children}
            </div>
            <div className="box-footer">
                {props.footer}
            </div>
        </div>
    </Grid>
)
