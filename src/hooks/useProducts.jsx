import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {loadProducts as loadProductsFromFirebase, registerNewProduct as registerNewProductToFirebase} from "../api/firebase";

const useProducts = () => {
    const queryClient = useQueryClient();

    const productsQuery = useQuery({
        queryKey: ['products'],
        queryFn: () => loadProductsFromFirebase(),
        staleTime: 1000 * 30
    });

    const registerProduct = useMutation({
        mutationFn: ({product, url}) => registerNewProductToFirebase(product, url),
        onSuccess: () => queryClient.invalidateQueries()
    });

    return {productsQuery, registerProduct};
}

export default useProducts;
