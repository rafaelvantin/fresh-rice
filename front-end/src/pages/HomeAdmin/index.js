import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';

const HomeAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Welcome Admin!</h1>

      <div className={styles.optionsContainer}>
        <div className={styles.button} onClick={() => navigate('/admin/clients')}>
          Gereciar Clientes
        </div>
        <div className={styles.button} onClick={() => navigate('/admin/products')}>
          Gerenciar Produtos
        </div>
        <div className={styles.button} onClick={() => navigate('/admin/admins')}>
          Gerenciar Admins
        </div>
      </div>
      
    </div>
  );
}

export default HomeAdmin;