import { useState } from 'react';

import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

function SearchInput(props){
    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            navigate(`/shop?search=${search}`);
        }
    }

    return(
        <div className={styles.containerSearchbox}  style={{width: `${props.width}`}}>
            <span className="material-symbols-outlined">search</span>
            <input className={styles.searchbox} value={search} onChange={(e) => setSearch(e.target.value)}
             type="text" placeholder="Digite o produto desejado" onKeyDown={handleKeyPress}/>
        </div>
    )
}

export default SearchInput