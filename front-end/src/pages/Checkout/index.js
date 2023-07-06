import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import CartContext from "../../context/Cart/CartContext";

import HorizontalProduct from "../../components/HorizontalProduct";
import TextInput from "../../components/TextInput";
import MaskedInput from "../../components/MaskedInput";
import UFSelect from "../../components/UFSelect";
import Button from "../../components/Button";
import Header from "../../components/header";
import OkPurchasePoup from "../../components/OkPurchasePoup";

import styles from "./styles.module.css"
import { AuthContext } from "../../context/AuthHandler";

const Checkout = () => {
    const { cartItems, handleCheckout } = useContext(CartContext)
    const {user} = useContext(AuthContext)
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

    const handleAddressSubmit = (e) => {
        e.preventDefault();

        setOnPayment(true);
    }

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        if(isEmpty(name) || isEmpty(cardNumber) || isEmpty(cardDate) || isEmpty(cardCVV)){
            alert("Preencha todos os campos");
        }else{
            console.log(cartItems);

            toast.promise(
                api.post(`/orders?id=${user.id}`, {
                    products: cartItems,
                    total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                    payment: {
                        name,
                        cardNumber,
                        expirationDate: cardDate,
                        cvv: cardCVV
                    },
                    address: {
                        zipCode: cep,    
                        street: rua,
                        number: numero,
                        complement: complemento,
                        city: cidade,
                        state: uf
                    }
                }).then((response) => {
                        setPopupVisible(true);
                        handleCheckout();
                    }
                )
                .catch((err) => {
                  throw new Error(err.response.data.error);
                }), {
                    pending: "Finalizando compra...",
                    success: "Compra finalizada com sucesso!",
                    error: {
                        render({ data }) {  
                            return `${data}`;
    
                        }
                    }
                }
            )   

        }
    }
    
    const handlePopupResponse = (response) => {
        setPopupVisible(false);
        navigate('/shop');
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
                            <form onSubmit={handlePaymentSubmit} style={{width: "75%"}}>
                                <h2>Detalhes do pagamento</h2>

                                <TextInput placeholder="Nome no cartão" name="ccname" value={name} onChange={(e) => setName(e.target.value)} required/>

                                <MaskedInput placeholder="Número do cartão" name="cardNumber" required setUnmaskedValue={setCardNumber} invalidMessage="Por favor, insira um cartão válido" maskOptions={{ mask: 'dddd dddd dddd dddd' }}/>

                                <MaskedInput placeholder="Validade" name="exp-date" required setUnmaskedValue={setCardDate} maskOptions={{ mask: 'dd/dd' }}/>

                                <MaskedInput placeholder="CVV" name="cvv" required setUnmaskedValue={setCardCVV} maskOptions={{ mask: "ddd" }}/>

                                <Button submit text={"Finalizar compra!"} />
                            </form>
                        ) : (
                            <form onSubmit={handleAddressSubmit} style={{width: "75%"}}>
                                <h2>Informações de entrega</h2>

                                <MaskedInput placeholder="CEP" required setUnmaskedValue={setCep} maskOptions={{ mask: "ddddd-ddd" }} />
                                
                                <div className={styles.rowInput}>
                                    <TextInput placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} required width="65%"/>

                                    <TextInput type="number" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} required width="30%"/>
                                </div>

                                <TextInput placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)}/>

                                <div className={styles.rowInput}>
                                    <TextInput placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} width="75%" required/>

                                    <UFSelect value={uf} setValue={setUF} required style={{width: "20%"}}/>
                                </div>

                                <Button submit text={"Continuar para pagamento"} />
                            </form>
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