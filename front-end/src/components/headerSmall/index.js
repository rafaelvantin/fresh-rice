import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fallDown as Menu } from 'react-burger-menu'
import { toast } from "react-toastify";

import { AuthContext } from "../../context/AuthHandler";
import styles from "./styles.module.css"

import SearchInput from "../SearchInput";

function HeaderSmall(){
    const navigate = useNavigate();
    const Auth = useContext(AuthContext);

    const handleLogout = () => {
        toast.promise(
            Auth.logout(),
            {
                pending: "Saindo...",
                success:  "Sessão encerrada com sucesso!",
                error: {
                    render({ data }) {
                        return data;
                    },
                },
            }
        ).then(() => {
            navigate("/");
        }).catch(() => {});
    }

    return (
        <header className={styles.container}>
            <SearchInput width={'80%'}/>
            <Menu menuClassName={styles.menu} customBurgerIcon= {
                 <option className="material-symbols-outlined">
                        menu
                </option>
                } 
                burgerButtonClassName={styles.burgerButton}
                styles={{
                    "bmItem": {
                        "display": "flex",
                    }
                }}
            > 

                {Auth.isAuthenticated && (
                <>
                    <span className={styles.menuItem} style={{fontSize: "larger"}}>Olá, {Auth.user.name}</span>
                    <div className={styles.divider} />
                </>
                )}

                <Link to="/" className={`${styles.menuItem} ${styles.clickable}`}>
                    <span className={`material-symbols-outlined ${styles.icon}`}>home</span>
                    <span>Home</span>
                </Link>
                
                <Link to="/shop" className={`${styles.menuItem} ${styles.clickable}`}>
                    <span className={`material-symbols-outlined ${styles.icon}`}>eyeglasses</span>
                    <span>Produtos</span>
                </Link>

                <Link to="/about" className={`${styles.menuItem} ${styles.clickable}`}>
                    <span className={`material-symbols-outlined ${styles.icon}`}>info</span>
                    <span>Sobre</span>
                </Link>

                <Link to="/cart" className={`${styles.menuItem} ${styles.clickable}`}>
                    <span className={`material-symbols-outlined ${styles.icon}`}>shopping_bag</span>
                    <span>Meu Carrinho</span>
                </Link>

                <div className={styles.divider} />

                {Auth.isAuthenticated ? (
                <>
                    <Link to="/profile" className={`${styles.menuItem} ${styles.clickable}`}>
                        <span className={`material-symbols-outlined ${styles.icon}`}>person</span>
                        <span>Minha Conta</span>
                    </Link>

                    <Link to="/orders" className={`${styles.menuItem} ${styles.clickable}`}>
                        <span className={`material-symbols-outlined ${styles.icon}`}>receipt</span>
                        <span>Meus Pedidos</span>
                    </Link>

                    {Auth.user.type === "admin" && (
                        <Link to="/admin" className={`${styles.menuItem} ${styles.clickable}`}>
                            <span className={`material-symbols-outlined ${styles.icon}`}>shield_person</span>
                            <span>Administração</span>
                        </Link>
                    )}

                    <div className={`${styles.menuItem} ${styles.clickable}`} onClick={Auth.logout}>
                        <span className={`material-symbols-outlined ${styles.icon}`}>logout</span>
                        <span>Sair</span>
                    </div>
                </>
                ) : (
                <>
                    <Link to="/login" className={`${styles.menuItem} ${styles.clickable}`}>
                        <span className={`material-symbols-outlined ${styles.icon}`}>login</span>
                        <span>Entrar</span>
                    </Link>
                </>    
                )}
                
            </Menu>
            
        </header>
    )
}

export default HeaderSmall;