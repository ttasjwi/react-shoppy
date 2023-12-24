import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {loadProduct} from "../api/firebase";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

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

    const {upsertCart} = useCart();

    const [success, setSuccess] = useState();

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const handleClick = () => {
        const additionalProduct = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            option: selected,
            quantity: 1
        };
        upsertCart.mutate(additionalProduct, {
            onSuccess: () => {
                setSuccess('장바구니에 추가되었습니다.');
                setTimeout(() => setSuccess(null), 3000);
            }
        });
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
            <p className='mx-12 mt-4 text-gray-700'>{product.category}</p>
            <section className='flex flex-col md:flex-row p-4'>
                <img className='w-full px-4 basis-7/12' src={product.image} alt={product.name}/>
                <div className='w-full basis-5/12 flex flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2'>{product.name}</h2>
                    <p className='text-2xl font-bold py-2 border-b border-gray-400'>₩{product.price}</p>
                    <p className='py-4 text-lg'>{product.description}</p>
                    <div className='flex items-center'>
                        <label
                            className='text-brand font-bold'
                            htmlFor='select'>
                            옵션:
                        </label>
                        <select
                            className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
                            id='select'
                            onChange={handleSelect} value={selected}
                        >
                            {product.options?.map((option, index) => <option key={index}>{option}</option>)}
                        </select>
                    </div>
                    {success && <p className='my-2'>✅{success}</p>}
                    <Button text='장바구니에 추가' onClick={handleClick}/>
                </div>
            </section>
        </section>
    );
}

export default ProductDetail;
