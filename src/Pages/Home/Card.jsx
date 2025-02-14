import React from 'react';

const card = ({item}) => {
    console.log(item);
    const {photo, Gender, country, userName,
        fullName} = item || {}
    
    return (
        <div className='bg-slate-100 p-4'>
            <div className='flex flex-col justify-center items-center'>
            <img src={photo}  alt="User Photo" className='w-32 h-32 object-cover rounded-full border shadow-lg' />
            <p className='text-xl font-semibold flex items-center justify-center'>{fullName} (<p className='text-sm font-semibold'>{userName}</p>)</p>
            </div>
            
            <p className='pt-6'>Country: {country}</p>
            <p className='pt-2'>Gender: {Gender}</p>
            
        </div>
    );
};

export default card;