import React from "react";
import ReactLoading from "react-loading";

export default ({height, width}) => (
    <ReactLoading type="spin" color="#00a65a" height={height} width={width}/>
);