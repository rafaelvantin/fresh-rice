import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Header from "../../components/header";
import ArrowBack from "../../components/ArrowBack";


const Signup = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        document.title = "Fresh Rice - Cadastro";
    }, []);

    const [name, setName] = useState("");
    const [preco, setPreco] = useState("");
    const [cor, setCor] = useState("");
    const [material, setMaterial] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [images, setImages] = useState([]);
    const [descricao, setDescricao] = useState("");

    const handleCadastro = () => {
        // TODO: handle create with API.
        navigate('/admin');
    };

    const handleFileChange = (e) => {
        if(!e.target.files)
            return;

        const newImages = Array.from(e.target.files);

        if(images === [])
        {
            setImages(newImages);
            return;
        }

        setImages((prevImages) => [...prevImages, ...newImages]);        
    }

    const handleRemoveFile = (image) => {
        setImages((prevImages) => prevImages.filter((prevImage) => prevImage !== image));
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

                    <TextInput type="text" placeholder="Digite o preço" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} required={true}/>

                    <TextInput type="text" placeholder="Digite a cor da armação (ex: #fff)" name="cor" value={cor} onChange={(e) => setCor(e.target.value)} required={true}/>

                    <TextInput type="text" placeholder="Material da lente" name="material" value={material} onChange={(e) => setMaterial(e.target.value)} required={true}/>
                    <div className={styles.imagesContainer}>
                        {
                            images.length > 0 ? (
                                <div className={styles.listImages}>
                                    {images.map((image, index) => (
                                    <div key={index} style={{ fontSize: '11px' }}>
                                        {image.name}
                                        <span style={{ marginLeft: '5px', cursor: 'pointer', color: 'black'}} onClick={() => handleRemoveFile(image)}>X</span>
                                    </div>
                                    ))}
                                </div>

                            ) : (
                                <ul className={styles.listImages}>
                                    <li key={0}>
                                        <span style={{ fontSize: '13px' }}>Adicione alguma imagem.</span>
                                    </li>
                                </ul>
                            )
                        }
                        <Button text="+" style={{width: '30px', height: '30px'}} onClick={() => inputRef.current.click()}/>
                    </div>

                    <input type="file" ref={inputRef} style={{ display: 'none'}} multiple name="imagens" onChange={handleFileChange}/>

                    <TextInput type="text" placeholder="Quantidade em estoque" name="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required={true}/>

                    <TextInput type="textarea" placeholder="Digite a descrição (limite de 100 caracteres)" name="descricao" value={descricao} rows={3} cols={3} onChange={(e) => setDescricao(e.target.value)} required={true}/>
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
