import { useContext, useEffect } from "react";
import Header from "../../components/header";
import CartContext from "../../context/Cart/CartContext";
import HorizontalProduct from "../../components/HorizontalProduct";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Cart = () => {

    useEffect(() => {
        document.title = "Fresh Rice - Carrinho";
    }, []);

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
                        <div className={styles.boxProduct}>{
                            cartItems.map((item) => {
                                
                                return (
                                    <HorizontalProduct key={item._id} product={item} />
                                )
                            })}</div>
                    ) : (
                        <div className={styles.boxProduct}>Seu carrinho está vazio</div>
                    )  
                }
                <div className={styles.boxTotal}>
                    <h3>Detalhes do pedido</h3>
                    <div className={styles.boxTotalItem}>
                        <div className={styles.subtotal}>
                            <p>Subtotal</p>
                            <p>R${total}</p>
                            
                        </div>
                        <div className={styles.total}>
                            <p>Total</p>
                            <p>R${total}</p>
                        </div>
                    </div>
                    { cartItems.length > 0 && (
                        <Button onClick={() => navigate('/cart/checkout')} 
                            text={"Finalizar compra"}
                            width="100%"
                        />
                    )
                    }
                </div>
            </div>
        </div>
        </>

    )

}

export default Cart;