import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMask } from "@react-input/mask"

import styles from '../styles.module.css';

import Header from "../../../components/header";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import MaskedInput from "../../../components/MaskedInput";
import UFSelect from "../../../components/UFSelect";

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

                    <MaskedInput type="text" placeholder="Digite seu CPF" name="cpf" required invalidMessage="Por favor, digite um CPF válido." setUnmaskedValue={setCpf} maskOptions={{ mask: "ddd.ddd.ddd-dd" }}/>

                    <TextInput type="date" placeholder="Digite sua data de nascimento" name="dataNascimento" value={dob} onChange={(e) => setDob(e.target.value)} required/>

                    <input type="submit" style={{display: "none"}}/>
                </form>

                <h2>Endereço</h2>

                <form className={styles.form} ref={forms[1]} onSubmit={handleSubmit}>

                    <MaskedInput type="text" placeholder="Digite seu CEP" name="cep" required invalidMessage="Por favor, digite um CEP válido." setUnmaskedValue={setCep} maskOptions={{ mask: "ddddd-ddd" }}/>

                    <div className={styles.rowInput}>
                        <TextInput type="text" placeholder="Digite sua rua" name="rua" value={street} onChange={(e) => setStreet(e.target.value)} required width="65%"/>

                        <TextInput type="number" placeholder="Número" name="numero" value={number} onChange={(e) => setNumber(e.target.value)} required width="30%"/>
                    </div>

                    <TextInput type="text" placeholder="Digite seu complemento" name="complemento" value={complement} onChange={(e) => setComplement(e.target.value)} required={false}/>

                    <TextInput type="text" placeholder="Digite seu bairro" name="bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required/>

                    <div className={styles.rowInput}>
                        <TextInput type="text" placeholder="Digite sua cidade" name="cidade" value={city} onChange={(e) => setCity(e.target.value)} required width="75%"/>

                        <UFSelect value={state} setValue={setState} required style={{width: "20%"}}/>
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
