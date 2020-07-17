import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { FaCode } from "react-icons/fa";

const LandingPage = (props) => {
    
    return (
        <>
        <div className="app">
            <FaCode style={{fontSize:'4rem'}} /> <br />
            <span style={{fontSize:'2rem'}}>Let`s Start Coding!</span>
        </div>
        <div style={{float:'right'}}>Thanks For Using This Boiler Plate</div>
        </>
    );
};

export default withRouter(LandingPage);