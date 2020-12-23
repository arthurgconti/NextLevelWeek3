import React from 'react'
import '../styles/pages/login.css'

import LogoHappy from '../images/Logotipo.svg'



function Login() {

    return (
        <div id="login">
            <div className="content-wrapper">

                <div className="presentation-container">
                    <img src={LogoHappy} alt="logo happy" />

                    <div className="location">
                        <strong>Mirassol</strong>
                        <span>São Paulo</span>
                    </div>
                    
                </div>

                <div className="local-form">

                </div>

            </div>
        </div>
    );


}


export default Login
