import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMask } from "@react-input/mask"

import styles from '../styles.module.css';

import Header from "../../../components/header";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("UF");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [maskedCpf, setMaskedCpf] = useState("");
    const cpfMask = useMask({
        mask: "ddd.ddd.ddd-dd",
        replacement: { d: /\d/ },
        separate: false,
        showMask: false,
        onMask: (e) => {
            setMaskedCpf(e.target.value)
            setCpf(e.detail.input);
            if(e.detail.isValid) {
                e.target.setCustomValidity("");
            }
            else {
                e.target.setCustomValidity("Por favor, digite um CPF válido.");
            }
        }
    });

    const [maskedCep, setMaskedCep] = useState("");
    const cepMask = useMask({
        mask: "ddddd-ddd",
        replacement: { d: /\d/ },
        separate: false,
        showMask: false,
        onMask: (e) => {
            setMaskedCep(e.target.value)
            setCep(e.detail.input);
            if(e.detail.isValid) {
                e.target.setCustomValidity("");
            }
            else {
                e.target.setCustomValidity("Por favor, digite um CEP válido.");
            }
        }
    });

    const forms = [
        useRef(),
        useRef(),
        useRef()
    ];

    useEffect(() => {
        document.title = "Fresh Rice - Cadastro";
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault();

        for(const form of forms) {
            if(!form.current?.reportValidity()) {
                return;
            }
        }

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem!");
            return;
        }

        handleSignup();
    };

    const handleSignup = () => {
        // TODO: handle login with API.
        // Mock signup:
        toast.promise(
            new Promise((resolve, reject) => {
                setTimeout(() => resolve(), 2000);
            }),
            {
                pending: "Cadastrando...",
                success:  "Cadastro realizado com sucesso!",
                error: {
                    render({ data }) {
                        return data;
                    }
                }
            }).then(() => {
                navigate("/login");
            }
        ).catch(() => {});
    };

    return (
    <>
        <Header />
        <main className={styles.container}>
            <h1>Cadastre-se</h1>
            <div className={styles.contentBox}>

                <h2>Dados Pessoais</h2>
                
                <form className={styles.form} ref={forms[0]} onSubmit={handleSubmit}>
                    <TextInput type="text" placeholder="Digite seu nome completo" name="nome" value={name} onChange={(e) => setName(e.target.value)} required/>

                    <TextInput type="email" placeholder="Digite seu email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    <TextInput type="text" placeholder="Digite seu CPF" name="cpf" required ref={cpfMask} value={maskedCpf}/>

                    <TextInput type="date" placeholder="Digite sua data de nascimento" name="dataNascimento" value={dob} onChange={(e) => setDob(e.target.value)} required/>

                    <input type="submit" style={{display: "none"}}/>
                </form>

                <h2>Endereço</h2>

                <form className={styles.form} ref={forms[1]} onSubmit={handleSubmit}>

                    <TextInput type="text" placeholder="Digite seu CEP" name="cep" value={maskedCep} required ref={cepMask}/>

                    <div className={styles.rowInput}>
                        <TextInput type="text" placeholder="Digite sua rua" name="rua" value={street} onChange={(e) => setStreet(e.target.value)} required width="65%"/>

                        <TextInput type="number" placeholder="Número" name="numero" value={number} onChange={(e) => setNumber(e.target.value)} required width="30%"/>
                    </div>

                    <TextInput type="text" placeholder="Digite seu complemento" name="complemento" value={complement} onChange={(e) => setComplement(e.target.value)} required={false}/>

                    <TextInput type="text" placeholder="Digite seu bairro" name="bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required/>

                    <div className={styles.rowInput}>
                        <TextInput type="text" placeholder="Digite sua cidade" name="cidade" value={city} onChange={(e) => setCity(e.target.value)} required width="75%"/>

                        <select className={styles.formInput} name="estado" id="estado" style={{width: "20%"}} onChange={(e) => setState(e.target.value)} value={state}>
                            <option value="UF" disabled hidden>UF</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AM">AM</option>	
                            <option value="AP">AP</option>	
                            <option value="BA">BA</option>	
                            <option value="CE">CE</option>	
                            <option value="DF">DF</option>	
                            <option value="ES">ES</option>	
                            <option value="GO">GO</option>	
                            <option value="MA">MA</option>	
                            <option value="MG">MG</option>	
                            <option value="MS">MS</option>	
                            <option value="MT">MT</option>	
                            <option value="PA">PA</option>	
                            <option value="PB">PB</option>	
                            <option value="PE">PE</option>	
                            <option value="PI">PI</option>	
                            <option value="PR">PR</option>	
                            <option value="RJ">RJ</option>	
                            <option value="RN">RN</option>	
                            <option value="RO">RO</option>	
                            <option value="RR">RR</option>	
                            <option value="RS">RS</option>	
                            <option value="SC">SC</option>	
                            <option value="SE">SE</option>	
                            <option value="SP">SP</option>	
                            <option value="TO">TO</option>
                        </select>
                    </div>

                    <input type="submit" style={{display: "none"}}/>
                </form>

                <h2>Senha</h2>

                <form className={styles.form} ref={forms[2]} onSubmit={handleSubmit}>
                    <TextInput type="password" placeholder="Digite sua senha" name="senha" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />

                    <TextInput type="password" placeholder="Confirme sua senha" name="senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />

                    <input type="submit" style={{display: "none"}}/>
                </form>

                <div className={styles.form} style={{marginBottom: 0}}>
                    <Button text="Cadastrar" onClick={handleSubmit}/>

                    <Link className={styles.link} to="/login">Já possui uma conta? <strong>Faça login</strong>.</Link>
                </div>

            </div>
        </main>
    </>
    );
}

export default Signup;
