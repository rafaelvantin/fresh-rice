import { useEffect, useRef } from "react";

import styles from "./styles.module.css";

const UFSelect = ({
    value,
    setValue,
    required = false,
    ...props
 }) => {

    const selectRef = useRef();

    // Set default value on first render
    useEffect(() => {
        setValue("UF");

        // If required, set validity
        if(required) {
            selectRef.current.setCustomValidity("Selecione uma UF");
        }
    }, []);

    const handleChange = (e) => {
        // Set value
        setValue(e.target.value);

        // If required, set validity
        if(required) {
            e.target.setCustomValidity(e.target.value === "UF" ? "Selecione uma UF" : "");
        }

        // Call onChange prop if it exists
        if(props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <select 
            ref={selectRef}
            className={styles.select} 
            onChange={handleChange} 
            value={value}
            required={required}
            {...props}
        >
                    <option value="UF" disabled hidden>UF</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AM">AM</option>	
                    <option value="AP">AP</option>	
                    <option value="BA">BA</option>	
                    <option value="CE">CE</option>	
                    <option value="DF">DF</option>	
                    <option value="ES">ES</option>	
                    <option value="GO">GO</option>	
                    <option value="MA">MA</option>	
                    <option value="MG">MG</option>	
                    <option value="MS">MS</option>	
                    <option value="MT">MT</option>	
                    <option value="PA">PA</option>	
                    <option value="PB">PB</option>	
                    <option value="PE">PE</option>	
                    <option value="PI">PI</option>	
                    <option value="PR">PR</option>	
                    <option value="RJ">RJ</option>	
                    <option value="RN">RN</option>	
                    <option value="RO">RO</option>	
                    <option value="RR">RR</option>	
                    <option value="RS">RS</option>	
                    <option value="SC">SC</option>	
                    <option value="SE">SE</option>	
                    <option value="SP">SP</option>	
                    <option value="TO">TO</option>
        </select>
    )
};

export default UFSelect;