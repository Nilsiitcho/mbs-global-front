import React from "react";

export default props => (
    <header className="main-header">
        <a href="/" className="logo">
            <span className="logo-mini"><b>MBS</b></span>
            <span className="logo-lg">
                <i className='fa fa-globe'/>
                <b> MBS</b>
            </span>
        </a>
        <nav className='navbar navbar-static-top'>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a href="/" className="sidebar-toggle" data-toggle='offcanvas'/>
        </nav>
    </header>
)