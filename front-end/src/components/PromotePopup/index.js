import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import TextInput from '../TextInput';

const PromotePopup = ({ visible, popupResponse, name }) => {

    const [password, setPassword] = useState("");

    useEffect(() => {
        if(!visible) {
            setPassword("");
        }
    }, [visible]);

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>
                <h1 className={styles.title}>Tem certeza que deseja promover {name}?</h1>

                <p className={styles.subtitle}>Digite sua senha para confirmar:</p>

                <TextInput type="password" placeholder="Digite sua senha" name="senha" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} width="60%"/>

                <div className={styles.buttons_container}>

                    <button className={styles.button} onClick={() => popupResponse(false)}>Não</button>

                    <button
                        className={styles.button}
                        onClick={() => popupResponse(true, password)}
                        disabled={password === "" || password.length < 8}
                    >
                        Sim
                    </button>

                </div>
            </div>
        </div>
    ) : null;
}

export default PromotePopup;