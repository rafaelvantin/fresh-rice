import React, { useState } from "react";

import styles from '../../styles.module.css';

import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";

const RequestEmail = ({
    onSubmit = () => {}
}) => {

    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        onSubmit(email);
    }

    return (
        <form className={styles.form} >
            <label className={styles.label} htmlFor="email">Digite seu email para recuperar sua senha:</label>

            <TextInput type="email" placeholder="Digite seu email" name="email" required={true} value={email} onChange={(e) => setEmail(e.target.value)}/>

            <Button text="Enviar" onClick={handleSubmit}/>
        </form>
    );
}

export default RequestEmail;