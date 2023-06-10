import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css"
const ProductSmall = ({id, image, name, price}) => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}key={id}>
        
            <img src={image} alt={name} width={"100px"} onClick={
                () => navigate(`/shop/product`, {
                    state: {id}
                })
            }/>
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