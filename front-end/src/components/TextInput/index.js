import styles from './styles.module.css';

function TextInput({
    width = "100%",
    value = "",
    type = "text",
    style,
    placeholder, onChange
}){
    return(
        <input className={styles.textbox} style={{width: `${width}`, ...style}} type={type} placeholder={placeholder} onChange={onChange} value={value}/>
    )
}

export default TextInput;