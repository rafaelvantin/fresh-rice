import { useContext } from "react";
import Header from "../../components/header";
import CartContext from "../../context/Cart/CartContext";
import HorizontalProduct from "../../components/HorizontalProduct";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Cart = () => {
    const { cartItems, total} = useContext(CartContext);
    const navigate = useNavigate();
    return (
        <> 
        <Header />
        <div className={styles.container}>
            <div className={styles.boxTitle}>
                <h2>Carrinho</h2>
                <p>Ainda não acabou? <span onClick={() => navigate('/shop')}>Clique aqui para continuar comprando</span></p>
            </div>
        <div className={styles.boxMain}>
            {
                cartItems.length > 0 ? (
                    <div className={styles.boxProducts}>{
                        cartItems.map((item) => {
                            
                            return (
                                <HorizontalProduct key={item.id} product={item} />
                            )
                        })}</div>
                ) : (
                    <div className={styles.boxProducts}>Seu carrinho está vazio</div>
                )  
            }
            <div className={styles.boxTotal}>
                <p>Total</p>
                <p>R$ {total}</p>
            </div>
        </div>
        <Button onClick={() => navigate('/cart/checkout')} 
            text={"Finalizar compra"}
            width="50%"
        />        </div>
        </>

    )

}

export default Cart;