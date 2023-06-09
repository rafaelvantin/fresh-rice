import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';
import Header from "../../../components/header";

const PasswordRecovery = () => {
  //const navigate = useNavigate();

  return (
    <>
    <Header />
    <main className={styles.container}>
      <h1>PasswordRecovery</h1>      
    </main>
    </>
  );
}

export default PasswordRecovery;
