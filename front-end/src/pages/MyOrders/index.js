import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { AuthContext } from '../../context/AuthHandler'
import OrderCard from '../../components/OrderCard'
import Header from '../../components/header'
import api from '../../services/api'
const MyOrders = () => {

    useEffect(() => {
        document.title = "Fresh Rice - Meus pedidos";
    }, []);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        api.get(`/orders`).then((response) => {
            console.log(response.data)
            setOrders(response.data)
            }).catch((err) => {
                console.log(err)
            }
        )
    }, [])

    return (
        <>
        <Header />
        <div className={styles.container}>
            <h1>Seus pedidos </h1> 
            <div className={styles.orders}>
                {   
                   orders.length > 0 ? (
                        orders.map((order) => {
                            return (
                                <OrderCard key={order.id} order={order} />
                            )
                        }
                    )) : (
                        <h1>Você ainda não fez nenhum pedido</h1>
                    )
                }
            </div>
        </div>
        </>

    )
}

export default MyOrders;