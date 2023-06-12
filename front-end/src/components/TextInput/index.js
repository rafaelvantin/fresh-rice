import { forwardRef } from 'react';
import styles from './styles.module.css';

const TextInput = forwardRef(({
    width = "100%",
    value = "",
    type = "text",
    style,
    ...props
}, forwardedRef) => {
    return(
        <input className={styles.textbox} style={{width: `${width}`, ...style}} type={type} value={value} {...props} ref={forwardedRef}/>
    )
});

export default TextInput;