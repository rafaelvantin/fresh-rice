import { useEffect, useRef, useState } from 'react';

import TextInput from '../TextInput';
import MaskedInput from '../MaskedInput';
import Button from '../Button';

import styles from './styles.module.css';
import UFSelect from '../UFSelect';

const EditClient = ({ visible, popupResponse, client }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    let setMaskedCpf;
    let setMaskedCep;

    useEffect(() => {
        setNome("");
        setEmail("");
        setCpf("");
        setBirthdate("");

        setCep("");
        setRua("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setCidade("");
        setEstado("");

        /*setMaskedCpf("");
        setMaskedCep("");*/
        
        if(visible)
        {
            setNome(client.name);
            setEmail(client.email);
            setCpf(client.cpf);
    
            setCep(client.address.cep);
            setRua(client.address.street);
            setNumero(client.address.number);
            setComplemento(client.address.complement);
            setBairro(client.address.neighborhood);
            setCidade(client.address.city);
            setEstado(client.address.uf);

            setMaskedCpf(`${client.cpf.substring(0, 3)}.${client.cpf.substring(3, 6)}.${client.cpf.substring(6, 9)}-${client.cpf.substring(9, 11)}`);

            setMaskedCep(`${client.address.cep.substring(0, 5)}-${client.address.cep.substring(5, 8)}`);

            setBirthdate(client.birthdate.split('T')[0]);

        }

    }, [visible]);

    const forms = [
        useRef(),
        useRef(),
    ];

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(forms);

        for(const form of forms) {
            if(!form.current?.reportValidity()) {
                return;
            }
        }

        handleSendNewClient();
    };

    const handleSendNewClient = () => {
        const newClient = {
            name: nome,
            email,
            cpf,
            birthdate,
            address: {
                cep,
                street: rua,
                number: numero,
                complement: complemento,
                neighborhood: bairro,
                city: cidade,
                uf: estado,
            }
        }

        popupResponse(true, newClient);
    }

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>

            <h2>Dados Pessoais</h2>
                
            <form className={styles.signupForm} ref={forms[0]} onSubmit={handleSubmit}>
                <TextInput type="text" placeholder="Digite seu nome completo" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required={true}/>

                <TextInput type="email" placeholder="Digite seu email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>

                <MaskedInput type="text" placeholder="Digite seu CPF" name="cpf" required invalidMessage="Por favor, digite um CPF válido." setUnmaskedValue={setCpf} maskOptions={{ mask: "ddd.ddd.ddd-dd" }} getSetMaskedValue={({setMaskedValue})=>setMaskedCpf=setMaskedValue}/>

                <TextInput type="date" placeholder="Digite sua data de nascimento" name="dataNascimento" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required={true}/>
            </form>

            <h2>Endereço</h2>

            <form className={styles.signupForm} ref={forms[1]} onSubmit={handleSubmit}>
            <MaskedInput type="text" placeholder="Digite seu CEP" name="cep" required invalidMessage="Por favor, digite um CEP válido." setUnmaskedValue={setCep} maskOptions={{ mask: "ddddd-ddd" }} getSetMaskedValue={({setMaskedValue})=>setMaskedCep=setMaskedValue}/>

                <div className={styles.rowInput}>
                    <TextInput type="text" placeholder="Digite sua rua" name="rua" value={rua} onChange={(e) => setRua(e.target.value)} required={true} width="65%"/>

                    <TextInput type="number" placeholder="Número" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required={true} width="30%"/>
                </div>

                <TextInput type="text" placeholder="Digite seu complemento" name="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} required={false}/>

                <TextInput type="text" placeholder="Digite seu bairro" name="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required={true}/>

                <div className={styles.rowInput}>
                    <TextInput type="text" placeholder="Digite sua cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required={true} width="75%"/>

                    <UFSelect value={estado} setValue={setEstado} required style={{width: "20%"}}/>
                </div>
            </form>

            <div className={styles.btnContainer} style={{marginBottom: 0}}>
<<<<<<< HEAD
                <Button text="Salvar alterações" onClick={handleSubmit}/>
=======
                <Button text="Salvar alterações" width='300px' onClick={() => handleSendNewClient()}/>
>>>>>>> master
                <Button text="Cancelar" width='200px' onClick={() => popupResponse(false)}/>
            </div>
            </div>
        </div>
    ) : null;
}

export default EditClient;