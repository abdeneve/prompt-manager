import React from 'react';

function Modal({isOpen, handleClose, children}) {
    return (
        <div style={{display: isOpen ? "flex" : "none"}}
             className={"fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 justify-center items-center"}>
            <div className="bg-white rounded shadow-lg p-4 w-1/2">
                <div className={"flex justify-between mb-4"}>
                    <h2>Modal</h2>
                    <button onClick={handleClose}
                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-700 text-white" >
                        Cerrar
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
export default Modal;