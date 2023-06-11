import styles from './styles.module.css';

const DeletePopup = ({ visible, popupResponse, name }) => {

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>
                <h1 className={styles.title}>Tem certeza que deseja excluir {name}?</h1>
                <div className={styles.buttons_container}>
                    <button className={styles.button} onClick={() => popupResponse(true)}>Sim</button>
                    <button className={styles.button} onClick={() => popupResponse(false)}>Não</button>
                </div>
            </div>
        </div>
    ) : null;
}

export default DeletePopup;