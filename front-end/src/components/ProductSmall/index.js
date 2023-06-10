import styles from "./styles.module.css"
const ProductSmall = ({id, image, name, price}) => {
    return (
        <div className={styles.container}key={id}>
            <img src={image} alt={name} width={"100px"}/>
            <p>
                <span>
                {name}
                </span>
                <span>
                {price}
                </span>
            </p>
        </div>
    )

}

export default ProductSmall;