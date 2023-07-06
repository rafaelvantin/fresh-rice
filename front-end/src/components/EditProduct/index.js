import { useEffect, useRef, useState } from 'react';

import TextInput from '../TextInput';
import Button from '../Button';

import styles from './styles.module.css';

const EditProduct = ({ visible, popupResponse, product }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [frameMaterial, setFrameMaterial] = useState("");
    const [stock, setStock] = useState("");
    const [pathImage, setPathImage] = useState("");
    const [description, setDescription] = useState("");

    const [file, setFile] = useState(null);


    const inputRef = useRef(null);

    useEffect(() => {
        setName("");
        setPrice("");
        setColor("");
        setFrameMaterial("");
        setStock("");
        setPathImage([]);
        setDescription("");
        
        if(visible)
        {
            setName(product.name);
            setPrice(product.price);
            setColor(product.color);
            setFrameMaterial(product.frameMaterial);
            setStock(product.stock);
            setPathImage(product.pathImage);
            setDescription(product.description);
        }

    }, [visible]);

    const handleSendNewProd = () => {
        const newProd = {
            name,
            price,
            color,
            frameMaterial,
            stock,
            pathImage,
            description,
            file,
        };

        popupResponse(true, newProd);
    }

    const handleFileChange = (e) => {        
        if(!e.target.files)
            return;

        setFile(e.target.files[0]);
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
        
        if(pathImage === "")
        {
            return (
                <ul className={styles.listImages}>
                    <li key={0}>
                        <span style={{ fontSize: '13px' }}>Adicione alguma imagem.</span>
                    </li>
                </ul>
            );
        }
        else
        {
            return (
                <div className={styles.listImages}>
                    <div style={{ fontSize: '11px' }}>
                        <img src={`http://localhost:3333/${pathImage}`} alt="Imagem do produto" style={{ width: '100px', height: '100px', objectFit: 'cover'}}/>                               
                    </div>
                </div>
            );
        }
    }

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>

            <form className={styles.signupForm}>
                <TextInput type="text" placeholder="Digite o name do produto" name="name" value={name} onChange={(e) => setName(e.target.value)} required={true}/>

                <TextInput type="text" placeholder="Digite o preço" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required={true}/>

                <TextInput type="text" placeholder="Digite a color da armação (ex: #fff)" name="color" value={color} onChange={(e) => setColor(e.target.value)} required={true}/>

                <TextInput type="text" placeholder="Material da lente" name="frameMaterial" value={frameMaterial} onChange={(e) => setFrameMaterial(e.target.value)} required={true}/>
                <div className={styles.imagesContainer}>
                    {renderImage()}
                    <Button text="+" style={{width: '30px', height: '30px'}} onClick={() => inputRef.current.click()}/>
                </div>

                <input type="file" ref={inputRef} style={{ display: 'none'}} name="imagens" onChange={handleFileChange}/>

                <TextInput type="text" placeholder="Quantidade em estoque" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required={true}/>

                <TextInput type="textarea" placeholder="Digite a descrição (limite de 100 caracteres)" name="description" value={description} rows={3} cols={3} onChange={(e) => setDescription(e.target.value)} required={true}/>
            </form>


            <div className={styles.btnContainer} style={{marginBottom: 0}}>
                <Button text="Salvar alterações" width='300px' onClick={() => handleSendNewProd()}/>
                <Button text="Cancelar" width='200px' onClick={() => popupResponse(false)}/>
            </div>
            </div>
        </div>
    ) : null;
}

export default EditProduct;