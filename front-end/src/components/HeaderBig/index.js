import React, { useContext} from "react"
import styles from './styles.module.css';
import SearchInput from "../SearchInput";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/Cart/CartContext";

function HeaderBig(){
    const navigate = useNavigate();
    const {itemCount} = useContext(CartContext);
 
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
                    <span className="material-symbols-outlined" onClick={() => navigate('/cart')}>local_mall</span>
                    <span>{itemCount}</span>
                    <span id="headerLogin" onClick={() => navigate('/login')}>Login</span>
                </div>

            </div>
        </header>
    )
}
export default HeaderBig;