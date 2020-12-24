import React, { ButtonHTMLAttributes } from 'react'
import '../styles/components/primaryButton.css'

interface PRIMARY_BUTTON extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isDesable: boolean;
}

const PrimaryButton: React.FC<PRIMARY_BUTTON> = ({ text, isDesable, ...rest }) => {

    return (
        <div className="container-btn">
            <button {...rest} disabled={isDesable}>{text}</button>
        </div>
    );
}


export default PrimaryButton