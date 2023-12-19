import React from 'react';

const Button = ({text, onClick, disabled}) => (
    <button className='bg-brand py-2 px-4 text-white rounded-sm hover:brightness-110 disabled:bg-gray-500 disabled:brightness-100' onClick={onClick} disabled={disabled}>
        {text}
    </button>
);

export default Button;
