import styles from './styles.module.css'
import products from "../../products.json"

const OrderCard = ({order}) => {

    return (
        <div className={styles.container}>
            <h1>Pedido {order.id}</h1>
            <div className={styles.products}>
                {order.products.map(product => {
                    const productData = products.find(p => p.id === product.id)
                    console.log(productData)
                    return (
                        <div className={styles.product}>
                            <img src={productData.imagem} alt={productData.nome} />
                            <div className={styles.productInfo}>
                                <h2>{productData.nome}</h2>
                                <span>Quantidade: {product.quantity}</span>
                                <span>Total pago: R$ {(product.quantity * productData.preco).toFixed(2)}</span>
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