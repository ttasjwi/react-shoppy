import React from 'react';
import {useAuthContext} from "../context/AuthContext";
import {getCart} from "../api/firebase";
import {useQuery} from "@tanstack/react-query";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {FaEquals} from 'react-icons/fa';

const SHIPPING_PRICE = 3000;

const MyCart = () => {
    const {userId} = useAuthContext();
    const {isLoading, error, data:products} = useQuery({
        queryKey: ['carts'],
        queryFn: () => getCart(userId)
    });

    if (error) return <p>Cart Loading Error!!!</p>
    if (isLoading) return <p>loading...</p>

    const hasProducts = products && products.length > 0;

    const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0)

    return (
        <section>
            <p>내 장바구니</p>
            {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
            {hasProducts && <>
                <ul>
                    {products && products.map(product => <CartItem key={product.id} product={product} userId={userId} />)}
                </ul>
            </>}
            <div>
                <PriceCard text="상품 총액" price={totalPrice} />
                <BsFillPlusCircleFill />
                <PriceCard text="배송액" price={SHIPPING_PRICE} />
                <FaEquals />
                <PriceCard text="총가격" price={totalPrice + SHIPPING_PRICE} />
            </div>
        </section>
    );
}

export default MyCart;
