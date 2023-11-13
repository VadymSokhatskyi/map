import React from 'react';

import './Button.css';

type TButtonProps = {
    text: string;
    opacity: number;
    onClick?: () => void;
    isDisabled?: boolean;
}

const Button = (props: TButtonProps) => {

    const { text, opacity, onClick, isDisabled } = props;

    const disabledClass = isDisabled ? 'button--disabled' : '';

    return (
        <button
            className={`button ${disabledClass}`}
            style={{ background: isDisabled ? `rgba(0, 0, 0, ${opacity - 0.3}` : `rgba(0, 0, 0, ${opacity}` }}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;