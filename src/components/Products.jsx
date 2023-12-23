import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

const Products = () => {
    const {productsQuery: {isLoading, error, data: products}} = useProducts();

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>load failed. error = {error}</p>;

    return (
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {products && products.map(product => <ProductCard key={product.id} product={product}/>)}
        </ul>
    );
}

export default Products;
