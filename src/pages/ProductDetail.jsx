import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {loadProduct} from "../api/firebase";
import Button from "../components/ui/Button";

const ProductDetail = () => {
    const {productId} = useParams();
    const {isLoading, error, data: product} = useQuery({
        queryKey: ['product', productId],
        queryFn: () => loadProduct(productId),
        staleTime: 1000 * 60
    });

    const [selected, setSelected] = useState();
    useEffect(() => {
        if (product?.options?.length) {
            setSelected(product.options[0]);
        }
    }, [product]);

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const handleClick = (e) => {
        // 장바구니에 추가하면 됨
    };

    if (isLoading) {
        return <p>loading...</p>
    }
    if (error) {
        return <p>에러</p>
    }
    if (!product) {
        return <p>일치하는 식별자의 상품을 찾지 못 했습니다.</p>
    }


    return (
        <section>
            <p>{product.category}</p>
            <img src={product.image} alt={product.name}/>
            <div>
                <h2>{product.name}</h2>
                <p>₩{product.price}</p>
                <p>{product.description}</p>
                <label htmlFor='options'>옵션:</label>
                <select id='options' onChange={handleSelect} value={selected}>
                    {product.options?.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>
                <Button text='장바구니에 추가' onClick={handleClick}/>
            </div>
        </section>
    );
}

export default ProductDetail;
