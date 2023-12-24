import {useAuthContext} from "../context/AuthContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getCart, upsertCart as upsertCartOnFireBase, removeFromCart as removeFromCartOnFireBase } from "../api/firebase";

const useCart = () => {
    const {userId} = useAuthContext();
    const queryClient = useQueryClient();

    const cartQuery = useQuery({
        queryKey: ['carts', userId || ''],
        queryFn: () => getCart(userId),
        enabled: !!userId
    });

    const upsertCart = useMutation({
        mutationFn: (product) => upsertCartOnFireBase(userId, product),
        onSuccess: () => queryClient.invalidateQueries(['carts', userId])
    });

    const removeFromCart = useMutation({
        mutationFn: (productId) => removeFromCartOnFireBase(userId, productId),
        onSuccess: queryClient.invalidateQueries(['carts', userId])
    })

    return {cartQuery, upsertCart, removeFromCart};
}

export default useCart;
