import {loadProducts} from "../api/firebase";
import {useQuery} from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const Products = () => {
    const {isLoading, error, data:products} = useQuery({
        queryKey: ['products'],
        queryFn: () => loadProducts(),
        staleTime: 1000 * 30
    });

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>load failed. error = {error}</p>;

    return (
        <ul>
            {products && products.map(product => <ProductCard key={product.id} product={product} />)}
        </ul>
    )
}

export default Products;
