import styles from './styles.module.css'

const OrderCard = ({order}) => {
    const date = new Date(order.created_at)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const formattedDate = `${day}/${month}/${year}`
    return (
        <div className={styles.container}>
            
            <h1>Pedido {formattedDate}</h1>
            <div className={styles.products}>
                {order.products.map(product => {
                    return (
                        <div className={styles.product}>
                            <img src={`http://localhost:3333/${product.pathImage}`} alt={product.name} />
                            <div className={styles.productInfo}>
                                <h2>{product.name}</h2>
                                <span>Quantidade: {product.quantity}</span>
                                <span>Total pago: R$ {(product.quantity * product.price).toFixed(2)}</span>
                            </div>
                        </div>
                    )
                })
            }
            </div>  
        </div>
    )

}

export default OrderCard;