import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

import CartContext from "../../context/Cart/CartContext";

import HorizontalProduct from "../../components/HorizontalProduct";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Header from "../../components/header";
import OkPurchasePoup from "../../components/OkPurchasePoup";

import styles from "./styles.module.css"

const Checkout = () => {
    const { cartItems, handleCheckout } = useContext(CartContext)
    
    const [popupVisible, setPopupVisible] = useState(false)

    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUF] = useState("")


    const [ name, setName] = useState("")
    const [ cardNumber, setCardNumber] = useState("")
    const [ cardDate, setCardDate] = useState("")
    const [ cardCVV, setCardCVV] = useState("")

    const [onPayment, setOnPayment] = useState(false)

    const navigate = useNavigate()

    //Funciton to check if a value is empty, null or undefined
    const isEmpty = (value) => {
        return value === "" || value === null || value === undefined
       
    }

    const handleCheckoutOnClick = () => {
       
        if(isEmpty(name) || isEmpty(cardNumber) || isEmpty(cardDate) || isEmpty(cardCVV)){
            alert("Preencha todos os campos");
        }else{
            setPopupVisible(true);
            handleCheckout();
        }
    }
    
    const handlePopupResponse = (response) => {
        setPopupVisible(false);
        navigate('/shop')
    }

    return (
        <>
        <Header />
        <div className={styles.container}>
            <h1>Checkout</h1>

            <div className={styles.main}>
                <div className={styles.boxCard}>
                    <div className={styles.navContainer}>
                        <span className={styles.page} onClick={() => setOnPayment(false)}>Endereço</span>
                        <span className={styles.separator}></span>
                        <span className={styles.page} onClick={() => setOnPayment(true)}>Pagamento</span>
                    </div>
                    {
                        onPayment ? (
                            <>
                            <h2>Detalhes do pagamento</h2>
                            <TextInput placeholder="Nome no cartão" value={name} onChange={(e) => setName(e.target.value)}/>
                            <TextInput placeholder="Número do cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
                            <TextInput placeholder="Validade" value={cardDate} onChange={(e) => setCardDate(e.target.value)}/>
                            <TextInput placeholder="CVV" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)}/>
                            <Button onClick={handleCheckoutOnClick} text={"Finalizar comprar"} />
                            </>
                        ) : (
                            <>
                            <h2>Informações de entrega</h2>
                            <TextInput placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)}/>
                            <TextInput placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)}/>
                            <TextInput placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)}/>
                            <TextInput placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)}/>
                            <TextInput placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                            <TextInput placeholder="UF" value={uf} onChange={(e) => setUF(e.target.value)}/>
                            <Button onClick={() => setOnPayment(true)} text={"Continue para pagamento"} />
                            </>
                        )
                    }
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
        <OkPurchasePoup visible={popupVisible} popupResponse={handlePopupResponse} />
        </>
    )
}

export default Checkout