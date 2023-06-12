import styles from './styles.module.css';

function TextInput({
    width = "100%",
    value = "",
    type = "text",
    style,
    ...props
}){
    return(
        <input className={styles.textbox} style={{width: `${width}`, ...style}} type={type} value={value} {...props}/>
    )
}

export default TextInput;