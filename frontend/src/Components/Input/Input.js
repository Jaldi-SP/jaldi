import React from 'react';
import './Input.scss';

const Input = ({ value, onChange, placeholder }) => {
    return (
        <input
            className="input"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default Input;
