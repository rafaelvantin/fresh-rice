import styles from './styles.module.css';

const DeletePopup = ({ visible, setVisible, client }) => {

    const deleteUser = () => {
        // CALL API TO DELETE USER
        setVisible(false);
    }

    return (visible) ? (
        <div className={styles.popup}>
            <div className={styles.box}>
                <h1 className={styles.title}>Tem certeza que deseja excluir {client.name}?</h1>
                <div className={styles.buttons_container}>
                    <button className={styles.button} onClick={() => deleteUser()}>Sim</button>
                    <button className={styles.button} onClick={() => setVisible(false)}>Não</button>
                </div>
            </div>
        </div>
    ) : null;
}

export default DeletePopup;