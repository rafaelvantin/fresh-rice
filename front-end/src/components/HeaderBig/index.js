import React, { useState } from "react"
import styles from './styles.module.css';
import SearchInput from "../SearchInput";
import { useNavigate } from "react-router-dom";

function HeaderBig(){
    const navigate = useNavigate();

    const [cartTotal, setCartTotal] = useState(0);
    return(
        <header>
        
            <div className={styles.containerHeaderItens}>
                <div className={styles.logo}>
                    <img src="../../../img/logo.png" alt="Logo Fresh Rice" />
                </div>
                <div className={styles.centerItens}>
                    <span onClick={() => navigate('/')}>Home</span>
                    <span onClick={() => navigate('/shop')}>Produtos</span>
                    <span onClick={() => navigate('/about')}>Sobre</span>
                    <SearchInput />
                </div>
                <div className={styles.backItens}>
                    <span className="material-symbols-outlined">local_mall</span>
                    <span>{cartTotal}</span>
                    <span id="headerLogin">Login</span>
                </div>

            </div>
        </header>
    )
}
export default HeaderBig;