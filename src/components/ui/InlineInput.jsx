import React, { useState, useRef, useEffect } from 'react';

function InlineInput({ value, onSave }) {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef(null);

    const handleSave = () => {
        onSave(inputValue);
    };

    const handleCancel = () => {
        setInputValue(value);
    };

    const handleBlur = () => {
        handleSave()
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        }
        if (e.key === "Escape") {
            handleCancel();
        }
    }

    return (
        <input type="text"
            value={inputValue ?? ""}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            ref={inputRef}
            className={"border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 w-full min-w-[100px] sm:min-w-[150px] md:min-w-[200px] max-w-full sm:max-w-[300px]"}
        />
    )
}
export default InlineInput;