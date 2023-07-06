import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthHandler";
import { toast } from "react-toastify";

import Header from "../../components/header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import MaskedInput from "../../components/MaskedInput";
import UFSelect from "../../components/UFSelect";

import styles from "./styles.module.css"

const Profile = () => {  
    useEffect(() => {
        document.title = "Fresh Rice - Perfil"
    }, []);
    
    const Auth = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("UF");

    let setMaskedCep;

    const forms = [
        useRef(),
        useRef(),
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        for(const form of forms) {
            if(!form.current?.reportValidity()) {
                return;
            }
        }

        handleUpdate();
    };

    const populateFields = (user) => {
        console.log(user);
        setName(user.name);
        setEmail(user.email);
        setStreet(user.address.street);
        setNumber(user.address.number);
        setComplement(user.address.complement);
        setNeighborhood(user.address.neighborhood);
        setCity(user.address.city);
        setUf(user.address.uf);

        setCpf(`${user.cpf.slice(0, 3)}.${user.cpf.slice(3, 6)}.${user.cpf.slice(6, 9)}-${user.cpf.slice(9, 11)}`);

        setCep(user.address.cep);
        setMaskedCep(`${user.address.cep.slice(0, 5)}-${user.address.cep.slice(5, 8)}`);

        // Convert birthdate to yyyy-mm-dd format
        setBirthdate(user.birthdate.split("T")[0]);
    };

    // Fetch user data on initial render
    useEffect(() => {

        const fetchPromise = Auth.getUserDetails().then(populateFields);

        toast.promise(fetchPromise, {
            pending: "Carregando dados...",
            success: "Dados carregados!",
            error: "Não foi possível carregar os dados."
        });
    }, []);

    const handleUpdate = async () => {
        const userData = {
            name,
            birthdate,
            address: {
                cep,
                street,
                number,
                complement,
                neighborhood,
                city,
                uf
            }
        };

        const updatePromise = Auth.updateUser(userData).then(populateFields);

        toast.promise(updatePromise, {
            pending: "Atualizando dados...",
            success: "Dados atualizados!",
            error: "Não foi possível atualizar os dados."
        });
    };

    return (
        <>
        <Header />
        <main className={styles.container}>
            <h1>Meu Perfil</h1>
            <div className={styles.contentBox}>

                <h2>Dados Pessoais</h2>
                
                <form className={styles.form} ref={forms[0]} onSubmit={handleSubmit}>
                    <TextInput type="text" placeholder="Digite seu nome completo" name="nome" value={name} onChange={(e) => setName(e.target.value)} required/>

                    <TextInput type="email" placeholder="Digite seu email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled/>

                    <TextInput type="text" placeholder="Digite seu CPF" name="cpf" required disabled value={cpf}/>

                    <TextInput type="date" placeholder="Digite sua data de nascimento" name="dataNascimento" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required/>

                    <input type="submit" style={{display: "none"}}/>
                </form>

                <h2>Endereço</h2>

                <form className={styles.form} ref={forms[1]} onSubmit={handleSubmit}>

                    <MaskedInput type="text" placeholder="Digite seu CEP" name="cep" required invalidMessage="Por favor, digite um CEP válido." setUnmaskedValue={setCep} maskOptions={{ mask: "ddddd-ddd" }} getSetMaskedValue={({setMaskedValue}) => {setMaskedCep=setMaskedValue}}/>

                    <div className={styles.rowInput}>
                        <TextInput type="text" placeholder="Digite sua rua" name="rua" value={street} onChange={(e) => setStreet(e.target.value)} required width="65%"/>

                        <TextInput type="number" placeholder="Número" name="numero" value={number} onChange={(e) => setNumber(e.target.value)} required width="30%"/>
                    </div>

                    <TextInput type="text" placeholder="Digite seu complemento" name="complemento" value={complement} onChange={(e) => setComplement(e.target.value)} required={false}/>

                    <TextInput type="text" placeholder="Digite seu bairro" name="bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required/>

                    <div className={styles.rowInput}>
                        <TextInput type="text" placeholder="Digite sua cidade" name="cidade" value={city} onChange={(e) => setCity(e.target.value)} required width="75%"/>

                        <UFSelect value={uf} setValue={setUf} required style={{width: "20%"}}/>
                    </div>

                    <input type="submit" style={{display: "none"}}/>
                </form>

                <div className={styles.form} style={{marginBottom: 0}}>
                    <Button text="Salvar alterações" onClick={handleSubmit}/>
                </div>

              </div>
          </main>
      </>
    );
}

export default Profile;
