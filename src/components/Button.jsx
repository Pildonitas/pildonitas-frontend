
import React, { useState } from "react";

const Button = ({ title, action, tooltip, type = "button", loading = false, disabled, className="" }) => {
    const [internalLoading, setInternalLoading] = useState(false);
    const isLoading = loading || internalLoading;


    const handleClick = async () => {
        if (!action) return;
        setInternalLoading(true);

        try {
            const result = await action();//Ejecuta el metodo CRUD recibido como prop
            console.log(result);
        } catch (error) {
            console.error(error);
        } finally {
            setInternalLoading(false);
        }
    }
    return (
        
            <button 
            title={tooltip}
            type={type} 
            onClick={action ? handleClick : undefined} 
            className={className}
            disabled={isLoading || disabled}>

                {isLoading ? 'Cargando ...' : title}
            </button>
    )
}

export default Button;