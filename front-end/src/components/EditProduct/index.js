import { useEffect, useRef, useState } from 'react';

import TextInput from '../TextInput';
import Button from '../Button';

import styles from './styles.module.css';

const EditProduct = ({ visible, popupResponse, product }) => {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [cor, setCor] = useState("");
    const [material, setMaterial] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [images, setImages] = useState([]);
    const [descricao, setDescricao] = useState("");


    const inputRef = useRef(null);

    useEffect(() => {
        setNome("");
        setPreco("");
        setCor("");
        setMaterial("");
        setQuantidade("");
        setImages([]);
        setDescricao("");
        
        if(visible)
        {
            setNome(product.nome);
            setPreco(product.preco);
            setCor(product.cor);
            setMaterial(product.armacao);
            setQuantidade(product.estoque);
            setImages([{name: product.imagem}]);
            setDescricao(product.descricao);
        }

    }, [visible]);

    const handleSendNewProd = () => {
        const newProd = {
            nome,
            preco,
            cor,
            armacao: material,
            estoque: quantidade,
            imagem: images[0],
            descricao
        };

        popupResponse(true, newProd);
    }

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

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>

            <form className={styles.signupForm}>
                <TextInput type="text" placeholder="Digite o nome do produto" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required={true}/>

                <TextInput type="text" placeholder="Digite o preço" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} required={true}/>

                <TextInput type="text" placeholder="Digite a cor da armação (ex: #fff)" name="cor" value={cor} onChange={(e) => setCor(e.target.value)} required={true}/>

                <TextInput type="text" placeholder="Material da lente" name="material" value={material} onChange={(e) => setMaterial(e.target.value)} required={true}/>
                <div className={styles.imagesContainer}>
                    {
                        images ? (
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


            <div className={styles.btnContainer} style={{marginBottom: 0}}>
                <Button text="Salvar alterações" onClick={() => handleSendNewProd()}/>
                <Button text="Cancelar" width='200px' onClick={() => popupResponse(false)}/>
            </div>
            </div>
        </div>
    ) : null;
}

export default EditProduct;