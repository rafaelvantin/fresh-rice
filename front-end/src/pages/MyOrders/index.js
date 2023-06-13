import { useContext } from 'react'
import styles from './styles.module.css'
import { AuthContext } from '../../auth-handler'
import orders from '../../orders.json'
import OrderCard from '../../components/OrderCard'
import Header from '../../components/header'
const MyOrders = () => {
    const {user} = useContext(AuthContext)
    return (
        <>
        <Header />
        <div className={styles.container}>
            <h1>Seus pedidos </h1> 
            <div className={styles.orders}>
                {orders.filter(order => order.userId === user.id).map(order => 
                    (
                        <OrderCard order={order} />
                    )
                )
            }   
            </div>
        </div>
        </>

    )
}

export default MyOrders;