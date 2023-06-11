import React, { useContext } from "react"
import { Link } from "react-router-dom";

import styles from './styles.module.css';
import { AuthContext } from "../../auth-handler";

import SearchInput from "../SearchInput";
import CartContext from "../../context/Cart/CartContext";
import UserMenu from "../UserMenu";

function HeaderBig(){
    const Auth = useContext(AuthContext);
    const {itemCount} = useContext(CartContext);
    
    return(
        <header>
        
            <div className={styles.containerHeaderItens}>
                <div className={styles.logo}>
                    <img src="../../../img/logo.png" alt="Logo Fresh Rice" />
                </div>
                <div className={styles.centerItens}>
                    <Link to="/" className={styles.navItem}>Home</Link>
                    <Link to="/shop" className={styles.navItem}>Produtos</Link>
                    <Link to="/about" className={styles.navItem}>Sobre</Link>
                    <SearchInput />
                </div>
                <div className={styles.backItens}>
                    <Link to="/cart" className={styles.navItem}>
                        <span className="material-symbols-outlined">local_mall</span>
                        <span>{itemCount}</span>
                    </Link>
                    
                    <div className={styles.userMenu}>
                        {Auth.isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <Link to="/login" className={styles.navItem}>Login</Link>
                        )}
                        
                    </div>

                </div>

            </div>
        </header>
    )
}
export default HeaderBig;