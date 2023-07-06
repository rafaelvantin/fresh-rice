import { useEffect, useRef, useState } from 'react';

import TextInput from '../TextInput';
import Button from '../Button';

import styles from './styles.module.css';

const EditClient = ({ visible, popupResponse, admin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        setName("");
        setEmail("");
        setCpf("");
        setBirthdate("");
        setPhone("");

        if(visible)
        {
            setName(admin.name);
            setEmail(admin.email);
            setCpf(admin.cpf);
            const date = new Date(admin.birthdate);
            setBirthdate(date.toISOString().split('T')[0]);
            setPhone(admin.phone);
        }

    }, [visible]);

    const handleSendNewClient = () => {
        const newClient = {
            name,
            email,
            cpf,
            birthdate,
            phone
        }

        popupResponse(true, newClient);
    }

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>

            <h2>Dados Pessoais</h2>
                
            <form className={styles.signupForm}>
                <TextInput type="text" placeholder="Digite seu nome completo" name="nome" value={name} onChange={(e) => setName(e.target.value)} required={true}/>

                <TextInput type="email" placeholder="Digite seu email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>

                <TextInput type="text" placeholder="Digite seu CPF" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required={true}/>

                <TextInput type="date" placeholder="Digite sua data de nascimento" name="dataNascimento" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required={true}/>

            </form>

            
            <div className={styles.btnContainer} style={{marginBottom: 0}}>
                <Button text="Salvar alterações" width='300px' onClick={() => handleSendNewClient()}/>
                <Button text="Cancelar" width='200px' onClick={() => popupResponse(false)}/>
            </div>
            </div>
        </div>
    ) : null;
}

export default EditClient;