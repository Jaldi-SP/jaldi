import React from 'react';
import './Input.scss';

const Input = ({ type="text", value, onChange, placeholder, prefix }) => {
    return (
        <div className="input-container">
            {prefix && <span className="input-prefix">{prefix}</span>}
            <input
                className={`input ${prefix ? 'input-with-prefix' : ''}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;
