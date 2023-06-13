import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthHandler";

import Header from "../../components/header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import styles from "./styles.module.css"

const Profile = () => {
  const Auth = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {

    const {user} = Auth;
    const { id } = user;

    // SEARCH USER BY ID AND SAVE IN CLIENT 
      
    // setNome(client.nome);
    // setEmail(client.email);
    // setCpf(client.cpf);
    // setBirthdate(client.birthdate);
    // setPhone(client.phone);

    // setCep(client.address.cep);
    // setRua(client.address.rua);
    // setNumero(client.address.numero);
    // setComplemento(client.address.complemento);
    // setBairro(client.address.bairro);
    // setCidade(client.address.cidade);
    // setEstado(client.address.estado);

  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
  };
  

  useEffect(() => {
    document.title = "Fresh Rice - Perfil"
  }, []);

  return (
    <>
    <Header />
    <div className={styles.container}>
      <h1 className={styles.title}>Seu perfil</h1>
        <form className={styles.signupForm}>
            <TextInput type="text" placeholder="Digite seu nome completo" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required={true}/>

            <TextInput type="email" placeholder="Digite seu email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>

            <TextInput type="text" placeholder="Digite seu CPF" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required={true}/>

            <TextInput type="date" placeholder="Digite sua data de nascimento" name="dataNascimento" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required={true}/>
        </form>

        <h2>Endereço</h2>

        <form className={styles.signupForm}>
            <TextInput type="text" placeholder="Digite seu CEP" name="cep" value={cep}onChange={(e) => setCep(e.target.value)} required={true}/>

            <div className={styles.rowInput}>
                <TextInput type="text" placeholder="Digite sua rua" name="rua" value={rua} onChange={(e) => setRua(e.target.value)} required={true} width="65%"/>

                <TextInput type="number" placeholder="Número" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required={true} width="30%"/>
            </div>

            <TextInput type="text" placeholder="Digite seu complemento" name="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} required={false}/>

            <TextInput type="text" placeholder="Digite seu bairro" name="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required={true}/>

            <div className={styles.rowInput}>
                <TextInput type="text" placeholder="Digite sua cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required={true} width="75%"/>

                <select className={styles.formInput} name="estado" id="estado" style={{width: "20%"}}>
                    <option value="" disabled selected hidden>UF</option>
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
        </form>

        <div className={styles.btnContainer} style={{marginBottom: 0}}>
            <Button text="Salvar alterações" onClick={() => handleSalvar()}/>
        </div>
    </div>
    </>
  );
}

export default Profile;
