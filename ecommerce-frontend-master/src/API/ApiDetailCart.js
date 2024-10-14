                    import { api } from "./ApiClient";

export const getTotalQuantityInCart = async () => {
    try {
        const response = await api.get('/detailcart/totalQuantity');
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
}

export const getCartDetail = async (index) => {
    try {
        const response = await api.get(`/detailcart/detail?index=${index}`);
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
}

export const addToCartDetail = async (product, quantity,size ) => {
    try {
        const response = await api.post('/detailcart/add',{
            product,
            quantity, size
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
}

export const updateQuantityInDetailCart =async( productName , quantity , size) =>{
    try {
        const response =  await api.post(`/detailcart/update/${productName}?quantity=${quantity}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error('Error update quantity product to cart:', error);
        throw error;
    }
}