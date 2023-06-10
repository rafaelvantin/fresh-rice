import { useLocation} from "react-router-dom";
import Header from "../../components/header";
import products from "../../products.json";
import styles from "./styles.module.css";
import { useMemo, useState, useEffect } from "react";
import Button from "../../components/Button";
const Product = () => {
    const {id} =  useLocation().state;
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const currentProduct = useMemo(() => {
        const product = products.find((product) => product.id === id);
        setTotalPrice(product.preco);
        return product;
    }, [id]);

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
                <div>
                    <Button text={`Adicionar ao carrinho R$${totalPrice}`} />
                    <div>
                        +
                    </div>
                </div>
                
            </div>
            
        </main>

        </>
    );
};

export default Product;