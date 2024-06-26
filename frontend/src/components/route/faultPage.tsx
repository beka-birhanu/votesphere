import React from 'react';

const FaultPage: React.FC = () => {
    const handleRefresh = () => {
        const previousURL = localStorage.getItem('previousURL');
        if (previousURL) {
            localStorage.removeItem('previousURL');
            console.log(previousURL)
            window.location.href = previousURL;
        } else {
            window.location.reload();
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h1 className='text-2xl text-gray-700 mb-4'>Oops, something went wrong</h1>
            <button className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring' onClick={handleRefresh}>
                Refresh
            </button>
        </div>
    );
};

export default FaultPage;
