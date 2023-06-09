import styles from './styles.module.css';

function TextInput({
    width = "100%",
    value = "",
    type = "text",
    style,
    placeholder, 
    required = false,
    onChange
}){
    return(
        <input className={styles.textbox} style={{width: `${width}`, ...style}} type={type} placeholder={placeholder} onChange={onChange} value={value} required={required}/>
    )
}

export default TextInput;