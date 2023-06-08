

import SearchInput from "../SearchInput";
import styles from "./styles.module.css"
import { fallDown as Menu } from 'react-burger-menu'

function HeaderSmall(){
    
    return (
        <header className={styles.container}>
             <SearchInput width={'80%'}/>
            <Menu menuClassName={styles.menu}customBurgerIcon= {
                 <option className="material-symbols-outlined">
                        menu
                </option>
                } center> 
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="shop" className="menu-item" href="/about">Produtos</a>
                <a id="about" className="menu-item" href="/contact">Sobre</a>
                <a id="cart" className="menu-item" href="/contact">Carrinho</a>
                <a id="login" className="menu-item" href="/contact">Login</a>

            </Menu>
            
        </header>
    )
}

export default HeaderSmall;