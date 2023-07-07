import { useLocation, useNavigate} from "react-router-dom";
import Header from "../../components/header";
import api from "../../services/api";

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
    const [currentProduct, setCurrentProduct] = useState({});

    const navigate = useNavigate()

    // const currentProduct = useMemo(() => {
    //     const product = products.find((product) => product.id === id);
    //     setTotalPrice(product.price);
    //     return product;
    // }, [id]);
    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try{
            const { data } = await api.get(`/products/${id}`);
            setCurrentProduct(data[0]);
        }catch(err){
            console.log(err);
        }
    }

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


    const { addToCart, changeQuantity, cartItems } =
    useContext(CartContext);


    function handleAddToCart(){
        if(cartItems.find((item) => item._id === currentProduct._id)){
            changeQuantity([currentProduct, quantity + cartItems.find((item) => item._id === currentProduct._id).quantity]);
            navigate("/cart");
            return;
        }
        addToCart([currentProduct, quantity]);
        navigate("/cart");
    }

    return (
        <>
        <Header />
        <main className={styles.container}>
            <img src={`http://localhost:3333/${currentProduct.pathImage}`} alt={currentProduct.name} />
            <div className={styles.product}>
                <div className={styles.boxTitle}>
                    <h2>{currentProduct.name}</h2>
                    <p>{currentProduct.price ? currentProduct.price.toFixed(2) : ""}</p>
                </div>
                <p>{currentProduct.description}</p>
                <div className={styles.color}>
                    <p>Cor</p>
                    <div className={styles.circle} style={{backgroundColor: `${currentProduct.color}`}}/>                   
                </div>
                <p><strong>Material </strong> {currentProduct.frameMaterial}</p>
                <p>Estoque: {currentProduct.stock > 0 ? currentProduct.stock : "Não disponível"}</p>
                    {
                        currentProduct.stock > 0 && (
                            <div style={{display: "flex"}}>

                            <Button text={`Adicionar ao carrinho R$${totalPrice.toFixed(2)}`} width="100%" onClick={handleAddToCart}/>
                            <QuantityInput value={quantity} onChangePlus={handleChangeQuantityPlus} onChangeMinus={handleChangeQuantityMinus}/>        
                            </div>

                        )
                    }

                
            </div>
            
        </main>

        </>
    );
};

export default Product;