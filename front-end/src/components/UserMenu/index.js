import React, { useState, useContext, useEffect } from "react";
import styles from './styles.module.css';

import { AuthContext } from "../../context/AuthHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
    const Auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

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

        setMenuOpen(false);
    }

    // Close menu when clicking outside
    useEffect(() => {
        const listener = (e) => {
            if (e.target.closest(`.${styles.icon}`) === null && e.target.closest(`.${styles.dropdown}`) === null) {
                setMenuOpen(false);
            }
        }

        window.addEventListener('click', listener);

        return () => {
            window.removeEventListener('click', listener);
        }
    }, []);

    return (
    <>
        <div className={styles.icon} onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined">account_circle</span>
        </div>
            <div className={styles.dropdown} style={{display: menuOpen ? "block" : "none"}}>
                <div className={styles.dropdownItem}>
                    <span>Olá, {Auth.user.name}</span>
                </div>
                <div className={`${styles.dropdownItem} ${styles.clickable}`} onClick={() => navigate('/profile')}>
                    <span className="material-symbols-outlined">account_circle</span>
                    <span>Minha conta</span>
                </div>
                <div className={`${styles.dropdownItem} ${styles.clickable}`} onClick={() => navigate('/cart')}>
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <span>Meu carrinho</span>
                </div>
                <div className={`${styles.dropdownItem} ${styles.clickable}`} onClick={() => navigate('/user/orders')}>
                    <span className="material-symbols-outlined">receipt</span>
                    <span>Meus pedidos</span>
                </div>
                <div className={styles.divider}></div>
                {Auth.user.type === 'admin' &&
                (<div className={`${styles.dropdownItem} ${styles.clickable}`} onClick={() => navigate('/admin')}>
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    <span>Administração</span>
                </div>)}
                <div className={`${styles.dropdownItem} ${styles.clickable}`} onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                    <span>Sair</span>
                </div>
            </div>
    </>
    );
}