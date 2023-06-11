import { useContext } from "react";
import Header from "../../components/header";
import CartContext from "../../context/Cart/CartContext";
import HorizontalProduct from "../../components/HorizontalProduct";

const Cart = () => {
    const { cartItems, checkout, clearCart } = useContext(CartContext);
    console.log("teste");
    console.log(cartItems);
    return (
        <> 
        <Header />
        {
            cartItems.length > 0 ? (
                <div>{
                    cartItems.map((item) => {
                        
                        return (
                            <HorizontalProduct key={item.id} product={item} />
                        )
                    })}</div>
            ) : (
                <div>vazio</div>
            )
        }
        
        </>
    )

}

export default Cart;