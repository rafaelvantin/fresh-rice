import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import styles from '../styles.module.css';

import Header from "../../../components/header";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";

import { AuthContext } from "../../../auth-handler";

const Login = () => {
    const navigate = useNavigate();
    const Auth = useContext(AuthContext);

    useEffect(() => {
        document.title = "Fresh Rice - Login";
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        toast.promise(
            Auth.login(email, password),
            {
                pending: "Autenticando...",
                success:  "Autenticado com sucesso!",
                error: {
                    render({ data }) {
                        return data;
                    },
                },
            }
        ).then(() => {
            navigate("/");
        }).catch(() => {});
    };

    return (
    <>
        <Header />
        <main className={styles.container}>
            <h1>Bem-vindo de volta!</h1>
            <div className={styles.contentBox} style={{width: "30%", padding: "15px 40px"}}>
                <form className={styles.form} style={{width: "100%"}} onKeyDown={
                    (e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }
                }>
                    <TextInput type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <TextInput type="password" placeholder="Senha" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <span style={{textAlign: "right", width: "100%"}}>
                        <Link className={styles.link} to="/recuperar-senha">Esqueci minha senha.</Link>
                    </span>

                    <Button text="Entrar" onClick={handleLogin} style={{marginTop: "15px"}}/>
                    
                </form>
                <span style={{textAlign: "center", width: "100%", marginTop: "10px"}}>
                    <Link className={styles.link} to="/cadastro">Ou crie uma <strong>conta</strong>.</Link>
                </span>
            </div>
        </main>
    </>
    );
}

export default Login;
