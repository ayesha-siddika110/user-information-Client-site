import React from 'react';

const PrimaryButton = ({text}) => {
    return (
        <div className='bg-sky-700 text-white py-1 px-4 rounded-full text-lg'>
            {text}  
        </div>
    );
};

export default PrimaryButton;