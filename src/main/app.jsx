import React, {Fragment} from "react"
import {BrowserRouter as Router} from "react-router-dom";

import Header from "../common/template/header"
import Sidebar from "../common/template/sideBar"
import Routes from "./routes"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


export default props => (
    <Router>
        <Fragment>
            <Header/>
            <Sidebar/>
            <Routes/>
            <ToastContainer/>
        </Fragment>
    </Router>
)