import React from 'react';

function Modal({isOpen, handleClose, title = "Modal", children}) {
    return (
        <div style={{display: isOpen ? "flex" : "none"}}
             className={"fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 justify-center items-center p-4 z-50"}>
            <div className="bg-white rounded shadow-lg p-4 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className={"flex justify-between items-center mb-4"}>
                    <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
                    <button onClick={handleClose}
                            className="px-2 sm:px-3 py-1 rounded bg-red-500 hover:bg-red-700 text-white text-sm sm:text-base" >
                        Cerrar
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
export default Modal;