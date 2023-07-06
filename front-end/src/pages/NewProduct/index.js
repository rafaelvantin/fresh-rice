import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Header from "../../components/header";
import ArrowBack from "../../components/ArrowBack";

import api from "../../services/api";


const Signup = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        document.title = "Fresh Rice - Cadastro";
    }, []);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [frameMaterial, setFrameMaterial] = useState("");
    const [stock, setStock] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleCadastro = async () => {
        try
        {
            let data = new FormData();
    
            data.append('name', name);
            data.append('price', price);
            data.append('stock', stock);
            data.append('description', description);
            data.append('color', color);
            data.append('frameMaterial', frameMaterial);
                            
            if(file)
                data.append('file', file, file.name);                
    
    
            await api.post(`/products`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            navigate('/admin');
        } catch(err) {
            console.log(err);
        }
    };

    const handleFileChange = (e) => {
        if(!e.target.files)
            return;

        setFile(e.target.files[0]);       
    }

    const handleRemoveFile = (image) => {
        setFile((prevImages) => prevImages.filter((prevImage) => prevImage !== image));
    }

    const renderImage = () => {
        if(file)
        {
            return (
                <div className={styles.listImages}>
                    <div style={{ fontSize: '11px' }}>
                        <img src={URL.createObjectURL(file)} alt="Imagem do produto" style={{ width: '100px', height: '100px', objectFit: 'cover'}}/>
                    </div>
                </div>
            );
        }
        
        return (
            <ul className={styles.listImages}>
                <li key={0}>
                    <span style={{ fontSize: '13px' }}>Adicione alguma imagem.</span>
                </li>
            </ul>
        );
    }

    return (
    <>
        <Header />
        <ArrowBack />
        <main className={styles.container}>
            <h1>Cadastre um novo produto</h1>
            <div className={styles.signupBox}>

                <h2>{name}</h2>
                
                <form className={styles.signupForm}>
                    <TextInput type="text" placeholder="Digite o nome do produto" name="nome" value={name} onChange={(e) => setName(e.target.value)} required={true}/>

                    <TextInput type="text" placeholder="Digite o preço" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required={true}/>

                    <TextInput type="text" placeholder="Digite a color da armação (ex: #fff)" name="color" value={color} onChange={(e) => setColor(e.target.value)} required={true}/>

                    <TextInput type="text" placeholder="Material da lente" name="frameMaterial" value={frameMaterial} onChange={(e) => setFrameMaterial(e.target.value)} required={true}/>
                    <div className={styles.imagesContainer}>
                        {renderImage()}
                        <Button text="+" style={{width: '30px', height: '30px'}} onClick={() => inputRef.current.click()}/>
                    </div>

                    <input type="file" ref={inputRef} style={{ display: 'none'}} multiple name="imagens" onChange={handleFileChange}/>

                    <TextInput type="text" placeholder="Quantidade em estoque" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required={true}/>

                    <TextInput type="textarea" placeholder="Digite a descrição (limite de 100 caracteres)" name="description" value={description} rows={3} cols={3} onChange={(e) => setDescription(e.target.value)} required={true}/>
                </form>


                <div className={styles.signupForm} style={{marginBottom: 0}}>
                    <Button text="Cadastrar Produto" onClick={handleCadastro}/>
                </div>

            </div>
        </main>
    </>
    );
}

export default Signup;
