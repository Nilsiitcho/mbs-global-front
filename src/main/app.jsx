import React, {Fragment} from "react"
import {BrowserRouter as Router} from "react-router-dom";

import Header from "../common/template/header"
import Sidebar from "../common/template/sideBar"
// import Footer from "../common/template/footer"
import Routes from "./routes"


export default props => (
    <Router>
        <Fragment>
            <Header/>
            <Sidebar/>
            <Routes/>
            {/*<Footer/>*/}
        </Fragment>
    </Router>
)