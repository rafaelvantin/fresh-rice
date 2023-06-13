import { useState, forwardRef } from 'react';
import { useMask } from "@react-input/mask";

import TextInput from '../TextInput';

const MaskedInput = forwardRef(({
    maskOptions,
    setUnmaskedValue,
    invalidMessage,
    ...props
}) => {
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