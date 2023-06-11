import styles from './styles.module.css';

function Button({
    width = "100%",
    text,
    onClick = () => {},
    style
}){
    return(
        <input className={styles.button} style={{width: `${width}`, ...style}} type="button" value={text} onClick={onClick}/>
    )
}

export default Button;