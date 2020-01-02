import React from "react";

export default props => (
    <div className="user-panel">
        <div className="pull-left image">
            <img
                src="https://pbs.twimg.com/profile_images/1193237572727783425/hrd9kJug_400x400.png"
                className="img-circle" alt="Imagem do usuario"/>
        </div>
        <div className="pull-left info">
            <p>Elizabeth Olsen</p>
            <a href="#"><i className="fa fa-circle text-danger"/> Patrocinador: mbsadmin</a>
        </div>
    </div>
)