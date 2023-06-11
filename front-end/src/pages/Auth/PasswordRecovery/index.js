import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from '../styles.module.css';
import Header from "../../../components/header";

import RequestEmail from "./Steps/request-email";
import VerifyCode from "./Steps/verify-code";
import ChangePassword from "./Steps/change-password";

const PasswordRecovery = () => {
    const navigate = useNavigate();

    // Current step of the password recovery process.
    // 0: Request email.
    // 1: Verify code.
    // 2: Change password.
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        document.title = "Fresh Rice - Recuperar Senha";
    }, []);

    const handleRequestEmail = (email) => {
        // TODO: Send email to backend.
        setCurrentStep(1);
    }

    const handleVerifyCode = (code) => {
        // TODO: Verify code.
        if(code !== "123456") {
            toast.error("Código inválido!");
            return;
        }
        setCurrentStep(2);
    }

    const handleResendCode = () => {
        // TODO: Send code to email.
        // Mockup
        toast.promise(new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        }), {
            pending: "Enviando código...",
            success: "Código reenviado com sucesso!",
            error: "Erro ao reenviar código!"
        });
    }

    const handleChangePassword = (password) => {
        // TODO: Change password.
        // Mockup
        toast.promise(new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        }), {
            pending: "Alterando senha...",
            success: {
                render: "Senha alterada com sucesso!\nVocê será redirecionado para a página de login.",
                autoClose: 3000,
                onClose: () => {
                    console.log("Redirecting...")
                    navigate("/login");
                }
            },
            error: "Erro ao alterar senha!"
        });
    }

    return (
        <>
            <Header />
            <main className={styles.container}>
                <h1>Recuperar Senha</h1>
                <div className={styles.contentBox}>
                    {currentStep === 0 && <RequestEmail onSubmit={handleRequestEmail} />}
                    {currentStep === 1 && <VerifyCode onSubmit={handleVerifyCode} onResendCode={handleResendCode} />}
                    {currentStep === 2 && <ChangePassword onSubmit={handleChangePassword} />}  
                </div>    
            </main>
        </>
    );
}

export default PasswordRecovery;
