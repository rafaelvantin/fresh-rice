import { useContext, useEffect, useState } from "react";
import QuantityInput from "../QuantityInput";
import CartContext from "../../context/Cart/CartContext";
import styles from "./styles.module.css";
const HorizontalProduct = ({product, maxWidth}) => {
    const [totalPrice, setTotalPrice] = useState(product.price * product.quantity);
    const [quantity, setQuantity] = useState(product.quantity);
    const {changeQuantity, removeFromCart  } = useContext(CartContext);

    useEffect(() => {
        setTotalPrice(product.price * quantity);
    }, [product.price, quantity]);
    function handleChangeQuantityPlus(){
        if(quantity + 1 <= product.stock){
            changeQuantity([product, quantity + 1]);
            setQuantity(quantity + 1);
        }
    }

    function removeProduct(){
        console.log(product);
        removeFromCart(product);
    }
    
    function handleChangeQuantityMinus(){
        if(quantity - 1 > 0){
            changeQuantity([product, quantity - 1]);
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className={styles['horizontal-product']}>
            <div className={styles['horizontal-product__image']}>
                <img src={`http://localhost:3333/${product.pathImage}`} alt={product.name} />
            </div>
            <div className={styles['horizontal-product__info']}>
                <h1>{product.name}</h1>
                <p>Material: {product.frameMaterial}</p>

                <div className={styles['horizontal-product__info__quantity']}>
                    <p>Quantidade</p>
                    <QuantityInput value={quantity} onChangeMinus={handleChangeQuantityMinus} onChangePlus={handleChangeQuantityPlus}/>
                </div>
                <div className={styles['horizontal-product__info__price']}>
                    <p>R$ {totalPrice.toFixed(2)}</p>
                </div>
            </div>
            <div className={styles['horizontal-product__remove']}>
                <span onClick={removeProduct}>Remover</span>
            </div>
        </div>
    )
}

export default HorizontalProduct;