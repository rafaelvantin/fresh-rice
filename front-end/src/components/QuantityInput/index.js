import styles from "./styles.module.css";
const QuantityInput = ({value, onChangePlus, onChangeMinus}) => {

    return (
        <div className={styles.container}>
            <button className={styles.button}onClick={onChangeMinus}>-</button>
            <input className={styles.input} type="number" value={value} readOnly />
            <button className ={styles.button} onClick={onChangePlus}>+</button>
        </div>
    )

}

export default QuantityInput;