import React, { useState } from "react";
import { toast } from "react-toastify";

import styles from '../../styles.module.css';

import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";

const ChangePassword = ({
    onSubmit = () => {}
}) => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error("As senhas não coincidem!");
            return;
        }

        onSubmit(newPassword);
    }

    return (
        <form className={styles.form} >
            <TextInput type="password" placeholder="Digite sua nova senha" name="senha" required={true} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            <TextInput type="password" placeholder="Confirme sua nova senha" name="confirmarSenha" required={true} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>

            <Button text="Alterar senha" onClick={handleSubmit}/>
        </form>
    );
}

export default ChangePassword;