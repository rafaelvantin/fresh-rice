import { useState, forwardRef } from 'react';
import { useMask } from "@react-input/mask";

import TextInput from '../TextInput';

const MaskedInput = forwardRef(({
    setUnmaskedValue,
    maskOptions,
    invalidMessage = "Por favor, insira um valor válido",
    ...props
}) => {

    maskOptions = {
        showMask: false,
        separate: false,
        ...maskOptions,
        replacement: {
            d: /\d/,
            ...maskOptions.replacement
        }
    }

    const [maskedValue, setMaskedValue] = useState("");

    const mask = useMask({
        ...maskOptions,
        onMask: (e) => {
            setUnmaskedValue(e.detail.input);
            
            if(e.detail.isValid) {
                e.target.setCustomValidity("");
            }
            else {
                e.target.setCustomValidity(invalidMessage);
            }
        }
    });

    return <TextInput 
                {...props}
                ref={mask}
                onChange={(e) => setMaskedValue(e.target.value)}
                value={maskedValue}
            />  

});

export default MaskedInput;