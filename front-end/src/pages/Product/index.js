import { useLocation, useNavigate} from "react-router-dom";
import Header from "../../components/header";
import products from "../../products.json";
import styles from "./styles.module.css";
import { useMemo, useState, useEffect, useContext } from "react";
import Button from "../../components/Button";
import QuantityInput from "../../components/QuantityInput";
import CartContext from "../../context/Cart/CartContext";
const Product = () => {

    useEffect(() => {
        document.title = "Fresh Rice";
    }, []);

    const {id} =  useLocation().state;
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate()

    const currentProduct = useMemo(() => {
        const product = products.find((product) => product.id === id);
        setTotalPrice(product.price);
        return product;
    }, [id]);

    function handleChangeQuantityPlus(){
        if(quantity + 1 <= currentProduct.stock){
            setQuantity(quantity + 1);
        }
    }

    function handleChangeQuantityMinus(){
        if(quantity - 1 > 0){
            setQuantity(quantity - 1);
        }
    }
    useEffect(() => {
        setTotalPrice(currentProduct.price * quantity);
    },[currentProduct.price, quantity]);


    const { addToCart } =
    useContext(CartContext);


    function handleAddToCart(){
        addToCart([currentProduct, quantity]);
        navigate("/cart");
    }

    return (
        <>
        <Header />
        <main className={styles.container}>
            <img src={currentProduct.pathImage} alt={currentProduct.name} />
            <div className={styles.product}>
                <div className={styles.boxTitle}>
                    <h2>{currentProduct.name}</h2>
                    <p>{currentProduct.price}</p>
                </div>
                <p>{currentProduct.description}</p>
                <div className={styles.color}>
                    <p>Cor</p>
                    <div className={styles.circle} style={{backgroundColor: `${currentProduct.color}`}}/>                   
                </div>
                <p><strong>Material </strong> {currentProduct.frameMaterial}</p>
                <p>Estoque {currentProduct.stock}</p>
                <div style={{display: "flex"}}>
                    <Button text={`Adicionar ao carrinho R$${totalPrice.toFixed(2)}`} width="60%" onClick={handleAddToCart}/>
                    <QuantityInput value={quantity} onChangePlus={handleChangeQuantityPlus} onChangeMinus={handleChangeQuantityMinus}/>

                </div>
                
            </div>
            
        </main>

        </>
    );
};

export default Product;