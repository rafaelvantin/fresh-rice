import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';

import Button from '../../components/Button';
import Header from '../../components/header';

const HomeAdmin = () => {
  const navigate = useNavigate();

    useEffect(() => {
        document.title = "Fresh Rice - Menu Admin";
    }, []);

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.welcome}>Welcome Admin!</h1>

      <div className={styles.optionsContainer}>
        <Button text="Gerenciar Clientes" style={{width: "400px", height: "120px"}} onClick={() => navigate('/admin/clients')}/>
        <Button text="Gerenciar Produtos" style={{width: "400px", height: "120px"}} onClick={() => navigate('/admin/products')}/>
        <Button text="Gerenciar Admins" style={{width: "400px", height: "120px"}} onClick={() => navigate('/admin/admins')}/>
      </div>
      
    </div>
  );
}

export default HomeAdmin;
