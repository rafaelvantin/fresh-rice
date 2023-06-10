import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from './styles.module.css';

import Header from "../../../components/header";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";


const Login = () => {
    //const navigate = useNavigate();

    useEffect(() => {
        document.title = "Fresh Rice - Login";
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // TODO: handle login with API.
        console.log("Login");
    };

    return (
    <>
        <Header />
        <main className={styles.container}>
            <h1>Bem-vindo de volta!</h1>
            <div className={styles.loginBox}>
                <h2>Login com email</h2>
                <form className={styles.loginForm}>
                    <TextInput type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <TextInput type="password" placeholder="Senha" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <span style={{textAlign: "right", width: "100%"}}>
                        <Link className={styles.loginLink} to="/recuperar-senha">Esqueci minha senha.</Link>
                    </span>

                    <Button text="Entrar" onClick={handleLogin} style={{marginTop: "15px"}}/>
                    
                </form>
                <span style={{textAlign: "center", width: "100%", marginTop: "10px"}}>
                    <Link className={styles.loginLink} to="/cadastro">Ou crie uma <strong>conta</strong>.</Link>
                </span>
            </div>
        </main>
    </>
    );
}

export default Login;
