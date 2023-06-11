import { useContext, useEffect, useState } from "react";
import QuantityInput from "../QuantityInput";
import CartContext from "../../context/Cart/CartContext";

const HorizontalProduct = ({product}) => {
    const [totalPrice, setTotalPrice] = useState(product.preco * product.quantity);
    const [quantity, setQuantity] = useState(product.quantity);
    const {changeQuantity, removeFromCart  } = useContext(CartContext);

    useEffect(() => {
        setTotalPrice(product.preco * quantity);
    }, [product.preco, quantity]);
    function handleChangeQuantityPlus(){
        if(quantity + 1 <= product.estoque){
            changeQuantity([product, quantity + 1]);
            setQuantity(quantity + 1);
        }
    }

    function removeProduct(){
        removeFromCart(product);
    }
    
    function handleChangeQuantityMinus(){
        if(quantity - 1 > 0){
            changeQuantity([product, quantity - 1]);
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="horizontal-product">
            <div className="horizontal-product__image">
                <img src={product.imagem} alt={product.nome} />
            </div>
            <div className="horizontal-product__info">
                <h1>{product.nome}</h1>
                <p>Material: {product.armacao}</p>

                <div className="horizontal-product__info__quantity">
                    <p>Quantidade</p>
                    <QuantityInput value={quantity} onChangeMinus={handleChangeQuantityMinus} onChangePlus={handleChangeQuantityPlus}/>
                </div>
                <div className="horizontal-product__info__price">
                    <p>Preço</p>
                    <p>R$ {totalPrice}</p>
                </div>
            </div>
            <div className="horizontal-product__remove">
                <span onClick={removeProduct}>Remover</span>
            </div>
        </div>
    )
}

export default HorizontalProduct;