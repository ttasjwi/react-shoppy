import React from 'react';
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {removeFromCart, upsertCart} from "../api/firebase";

const CartItem = ({product, product: {id, name, image, option, quantity}, userId}) => {
    const handleMinus = () => {
        if (quantity < 2) return;
        upsertCart(userId, {...product, quantity: quantity - 1});
    };

    const handlePlus = () => {
        upsertCart(userId, {...product, quantity: quantity + 1});
    };
    const handleDelete = () => {
        removeFromCart(userId, id)
    };

    return (
        <li>
            <img src={image} alt={name}/>
            <div>
                <p>{name}</p>
                <p>{option}</p>
                <div>
                    <AiOutlineMinusSquare onClick={handleMinus}/>
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare onClick={handlePlus}/>
                    <RiDeleteBin5Fill onClick={handleDelete}/>
                </div>
            </div>
        </li>
    );
}

export default CartItem;
