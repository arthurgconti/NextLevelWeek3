import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import '../styles/pages/login.css'

import LogoHappy from '../images/Logotipo.svg'
import PrimaryButton from '../components/PrimaryButton';




function Login() {

    const [disable, setDisable] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateAndSetDisable() {
        password === '' && email === '' ? setDisable(true) : setDisable(false)
    }


    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        alert(`disparou Remeber: ${isChecked}`)
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
                    <form onSubmit={handleSubmit}>
                        <h2>Fazer Login</h2>
                        <br />

                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input id="email"
                                type="email"
                                placeholder="exemplo@exemplo.com"
                                value={email}
                                onChange={event => {
                                    setEmail(event.target.value)
                                    if (email !== '')
                                        setDisable(false)
                                }}
                                onBlur={() => validateAndSetDisable()}
                            />
                        </div>
                        <br />

                        <div className="input-block">
                            <label htmlFor="senha">Senha</label>
                            <input id="senha"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={event => {
                                    setPassword(event.target.value)
                                    if (password !== '')
                                        setDisable(false)
                                }}
                                onBlur={() => validateAndSetDisable()}
                            />
                        </div>
                        <br />

                        
                        <div className="checkbox-content">
                            <div className="checkbox-label">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={isChecked}
                                    className="check-style"
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <label htmlFor="remember"> Lembrar-me</label>
                            </div>

                            <Link to="/password-recovery">Esqueci minha senha</Link>
                        </div>
                        <br />
                        <PrimaryButton isDesable={disable} text="Entrar" />
                    </form>
                </div>

            </div>
        </div>
    );


}


export default Login
