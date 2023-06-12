import styles from './styles.module.css';

function Button({
    width = "100%",
    text,
    onClick = () => {},
    style,
    submit = false
}){
    return(
        <input className={styles.button} style={{width: `${width}`, ...style}} type={submit ? 'submit' : 'button'} value={text} onClick={onClick}/>
    )
}

export default Button;