import React from 'react';

function Input({ type="text", placeholder, value, onChange, className }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${className}`}
        />
    );
}

export default Input;