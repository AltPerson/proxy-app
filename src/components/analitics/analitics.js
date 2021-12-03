import React from "react";

import logo from "../logo.png"
import "./analitics.css";

import InfoCard from "./card";
import Tabs from "./table";

const Analitics = () => {

    
    return (
        <div className="analitic_wrapper">
            <img style={{ display: "block", margin: "0 auto" }} src={logo} alt="search"></img>
            
            <InfoCard/>
            <Tabs/>
        </div>
    )
}

export default Analitics;