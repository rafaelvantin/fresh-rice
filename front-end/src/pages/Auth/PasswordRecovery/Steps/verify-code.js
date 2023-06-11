import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from '../../styles.module.css';

import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";

const VerifyCode = ({
    onSubmit = () => {},
    onResendCode = () => {}
}) => {

    const [code, setCode] = useState("");
    const [resendCode, setResendCode] = useState(false);

    useEffect(() => {
        if(resendCode) return;

        const timer = setTimeout(() => {
            setResendCode(true);
        }, 60000);

        return () => {
            clearTimeout(timer);
        }
    }, [resendCode]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(code.length !== 6) {
            toast.error("O código deve ter 6 dígitos!");
            return;
        }

        onSubmit(code);
    }

    const handleResendCode = () => {
        if(!resendCode) return;
        setResendCode(false);
        onResendCode();
    }

    return (
        <form className={styles.form} >
            <label className={styles.label} htmlFor="codigo">Digite o código de verificação enviado para seu email:</label>

            <TextInput type="text" placeholder="Digite o código de verificação" name="codigo" required={true} value={code} onChange={(e) => setCode(e.target.value)}/>

            <span className={styles.link} onClick={handleResendCode} style={{display: (resendCode ? "inline" : "none")}} disabled={!resendCode}>Não recebeu? Reenviar código.</span>

            <Button text="Enviar" onClick={handleSubmit}/>
        </form>
    );
}

export default VerifyCode;