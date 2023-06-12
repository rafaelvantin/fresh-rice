import styles from './styles.module.css';

const OkPurchasePoup = ({ visible, popupResponse }) => {

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>
                <h1 className={styles.title}>Compra finalizada com sucesso!</h1>
                <i className={`material-symbols-outlined ${styles.icon}`}>check_circle</i>
                <div className={styles.buttons_container}>
                    <button className={styles.button} onClick={popupResponse}>Ok</button>
                </div>
            </div>
        </div>
    ) : null;
}

export default OkPurchasePoup;