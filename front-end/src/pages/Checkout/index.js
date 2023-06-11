import { useContext, useState } from "react"
import CartContext from "../../context/Cart/CartContext";
import styles from "./styles.module.css"
import HorizontalProduct from "../../components/HorizontalProduct";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, handleCheckout } = useContext(CartContext)
    const [ name, setName] = useState("")
    const [ cardNumber, setCardNumber] = useState("")
    const [ cardDate, setCardDate] = useState("")
    const [ cardCVV, setCardCVV] = useState("")

    const navigate = useNavigate()

    //Funciton to check if a value is empty, null or undefined
    const isEmpty = (value) => {
        return value === "" || value === null || value === undefined
       
    }

    const handleCheckoutOnClick = () => {
       
        if(isEmpty(name) || isEmpty(cardNumber) || isEmpty(cardDate) || isEmpty(cardCVV)){
            alert("Preencha todos os campos");
        }else{
            alert("Compra realizada com sucesso")
            handleCheckout();
            navigate('/shop')
        }
    }
    return (
        <div className={styles.container}>
            <h1>Checkout</h1>

            <div className={styles.main}>
                <div className={styles.boxCard}>
                    <h2>Digite os dados para pagamento</h2>
                    <TextInput placeholder="Nome no cartão" value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextInput placeholder="Número do cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
                    <TextInput placeholder="Validade" value={cardDate} onChange={(e) => setCardDate(e.target.value)}/>
                    <TextInput placeholder="CVV" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)}/>
                    <Button onClick={handleCheckoutOnClick} text={"Finalizar comprar"} />
                </div>
                <div className={styles.boxCart}>
                    <h2>Seu carrinho</h2>
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
                </div>

            </div>
        </div>
    )
}

export default Checkout