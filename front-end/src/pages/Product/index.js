import { useLocation} from "react-router-dom";
import Header from "../../components/header";
import products from "../../products.json";
import styles from "./styles.module.css";
import { useMemo, useState, useEffect } from "react";
import Button from "../../components/Button";
import QuantityInput from "../../components/QuantityInput";
const Product = () => {
    const {id} =  useLocation().state;
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const currentProduct = useMemo(() => {
        const product = products.find((product) => product.id === id);
        setTotalPrice(product.preco);
        return product;
    }, [id]);

    function handleChangeQuantityPlus(){
        if(quantity + 1 <= currentProduct.estoque){
            setQuantity(quantity + 1);
        }
    }

    function handleChangeQuantityMinus(){
        if(quantity - 1 > 0){
            setQuantity(quantity - 1);
        }
    }
    useEffect(() => {
        setTotalPrice(currentProduct.preco * quantity);
    },[currentProduct.preco, quantity]);
    return (
        <>
        <Header />
        <main className={styles.container}>
            <img src={currentProduct.imagem} alt={currentProduct.nome} />
            <div className={styles.product}>
                <div className={styles.boxTitle}>
                    <h2>{currentProduct.nome}</h2>
                    <p>{currentProduct.preco}</p>
                </div>
                <p>{currentProduct.descricao}</p>
                <div className={styles.color}>
                    <p>Cor</p>
                    <div className={styles.circle} style={{backgroundColor: `${currentProduct.cor}`}}/>                   
                </div>
                <p><strong>Material </strong> {currentProduct.armacao}</p>
                <p>Estoque {currentProduct.estoque}</p>
                <div style={{display: "flex"}}>
                    <Button text={`Adicionar ao carrinho R$${totalPrice}`} width="60%"/>
                    <QuantityInput value={quantity} onChangePlus={handleChangeQuantityPlus} onChangeMinus={handleChangeQuantityMinus}/>

                </div>
                
            </div>
            
        </main>

        </>
    );
};

export default Product;