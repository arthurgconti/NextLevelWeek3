import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import '../styles/pages/login.css'

import LogoHappy from '../images/Logotipo.svg'



function Login() {

    function handleOnSubmit(event: FormEvent) {
        event.preventDefault()


    }


    return (
        <div id="login">
            <div className="content-wrapper">

                <div className="presentation-container">
                    <img src={LogoHappy} alt="logo happy" />

                    <div className="text-location">
                        <strong>Mirassol</strong>
                        <span>São Paulo</span>
                    </div>

                </div>

                <div className="local-form">

                    <Link to="/" className="back-root">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </Link>
                    <form onSubmit={handleOnSubmit}>
                        <h2>Fazer Login</h2>
                        <br />
                        <label htmlFor="email">E-mail</label>
                        <input id="email" type="email" placeholder="exemplo@exemplo.com" />
                        <br />

                        <label htmlFor="senha">Senha</label>
                        <input id="senha" type="password" placeholder="Digite sua senha" />
                        <br />
                        <div className="checkbox-content">
                            <div className="checkbox-label">
                                <input type="checkbox" id="remember" name="remember" value="remember" className="check-style"/>
                                <label htmlFor="remember"> Lembrar-me</label>
                            </div>

                            <Link to="/">Esqueci minha senha</Link>
                        </div>
                        <br />
                        <button type="submit"> Entrar</button>
                    </form>
                </div>

            </div>
        </div>
    );


}


export default Login
