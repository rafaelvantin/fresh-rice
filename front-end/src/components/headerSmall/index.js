

import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput";
import styles from "./styles.module.css"
import { fallDown as Menu } from 'react-burger-menu'

function HeaderSmall(){
    const navigate = useNavigate();
    
    return (
        <header className={styles.container}>
             <SearchInput width={'80%'}/>
            <Menu menuClassName={styles.menu} customBurgerIcon= {
                 <option className="material-symbols-outlined">
                        menu
                </option>
                } burgerButtonClassName={styles.burgerButton}
                > 
                <span id="home" className="menu-item" onClick={() => navigate('/')}>Home</span>
                
                <span id="shop" className="menu-item" onClick={() => navigate('/shop')}>Produtos</span>
                <span id="about" className="menu-item" onClick={() => navigate('/about')}>Sobre</span>
                <span id="cart" className="menu-item" href="/contact">Carrinho</span>
                <span id="login" className="menu-item" href="/contact">Login</span>

            </Menu>
            
        </header>
    )
}

export default HeaderSmall;