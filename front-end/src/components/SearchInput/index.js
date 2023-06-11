import styles from './styles.module.css';

function SearchInput(props){
    return(
        <div className={styles.containerSearchbox}  style={{width: `${props.width}`}}>
            <span className="material-symbols-outlined">search</span>
            <input className={styles.searchbox} type="text" placeholder="Digite o produto desejado"/>
        </div>
    )
}

export default SearchInput