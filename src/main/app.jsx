import React from "react"
import {BrowserRouter as Router} from "react-router-dom";

import Header from "../common/template/header"

export default props => (
    <Router>
        <div className="wrapper">
            <Header/>
        </div>
    </Router>
)