import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';
import Header from "../../../components/header";

const PasswordRecovery = () => {
    //const navigate = useNavigate();

    useEffect(() => {
        document.title = "Fresh Rice - Recuperar Senha";
    }, []);

    return (
        <>
            <Header />
            <main className={styles.container}>
            <h1>PasswordRecovery</h1>      
            </main>
        </>
    );
}

export default PasswordRecovery;
