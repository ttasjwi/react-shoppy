import React from 'react';

const ProductCard = ({product: {id, image, name, category, price}}) => {

    return (
        <li>
            <img src={image} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{`₩${price}`}</p>
            </div>
            <p>{category}</p>
        </li>
    );
}

export default ProductCard;
