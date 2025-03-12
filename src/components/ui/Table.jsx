import React from 'react';

function Table({children}){
    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
                {children}
            </table>
        </div>
    )
}
export default Table;