import React from 'react';

const Button = ({text, onClick}) => (
    <button className='bg-brand py-2 px-4 text-white rounded-sm hover:brightness-110' onClick={onClick}>
        {text}
    </button>
);

export default Button;
